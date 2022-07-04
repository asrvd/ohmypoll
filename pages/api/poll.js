import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { id, title, options, visibility, createdBy } = req.body;
      const poll = await prisma.poll.create({
        data: {
          id,
          title,
          options: {
            create: options.map((option, index) => ({
              number: index + 1,
              text: option,
            })),
          },
          visibility,
          createdBy,
        },
      });
      res.status(200).json(poll);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error.message });
    }
  }
}
