import { PrismaService } from "src/prisma/prisma.service";
import { CreatePostDto } from "../dto/create-post.dto";
import { PostEntity } from "../entities/post.entity";
import { UpdatePostDto } from "../dto/update-post.dto";
import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { NotFoundError } from "src/common/errors/types/NotFoundError";

@Injectable()
export class PostRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(createPostDto: CreatePostDto): Promise<PostEntity> {

    const {authorEmail} = createPostDto;

    delete createPostDto.authorEmail;

    const user = await this.prisma.user.findUnique({
      where: {
        email : authorEmail,
      }
    });

    if (!user) {
      throw new NotFoundError("Author not found");
    }

    const data: Prisma.PostCreateInput = {
      ... createPostDto,
      author: {
        connect: {
          email: authorEmail,
        }
      }
    };

    return this.prisma.post.create({
      data,
    })
  }

  findAll(): Promise<PostEntity[]>  {
    return this.prisma.post.findMany({
      include: {
        author: true,
      }
    });
  }

  async findOne(id: number):  Promise<PostEntity> {
    return this.prisma.post.findUnique({
      where: {
        id,
      },
    });
  }

 async update(id: number, updatePostDto: UpdatePostDto): Promise<PostEntity> {

  const {authorEmail} = updatePostDto;

  if (!authorEmail) {
    return this.prisma.post.update({
      data: updatePostDto,
      where: { id, }
    });
  }

  delete updatePostDto.authorEmail;

  const user = await this.prisma.user.findUnique({
    where: {
      email: authorEmail,
    }
  });

  if (!user) {
    throw new NotFoundError("Author no found.");
  }

  const data: Prisma.PostUpdateInput = {
    ... updatePostDto,
    author: {
      connect: {
        email: authorEmail,
      },
    },
  }

  return this.prisma.post.update({
      where: { id },
      data,
      include: {
        author: {
          select: {
            name: true,
          }
        }
      }
    });
}

  async remove(id: number): Promise<PostEntity> {
    return this.prisma.post.delete({
      where: {
        id
      },
    });
  }

}
