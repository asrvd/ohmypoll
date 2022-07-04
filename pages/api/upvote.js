import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { id } = req.body;
      const upvote = await prisma.poll.update({
        where: {
          id: id,
        },
        data: {
          upvotes: {
            increment: 1,
          },
        },
      });
      res.status(200).json(upvote);
    } catch (error) {
      //   console.log(error);
      res.status(500).json({ error: error.message });
    }
  }
}
