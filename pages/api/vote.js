import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { id } = req.body;
      const vote = await prisma.option.update({
        where: {
          id: id,
        },
        data: {
          votes: {
            increment: 1,
          },
        },
      });
      res.status(200).json(vote);
    } catch (error) {
      //   console.log(error);
      res.status(500).json({ error: error.message });
    }
  }
}
