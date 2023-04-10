import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostRepository } from './repositories/posts.repository';

@Injectable()
export class PostsService {

  constructor(private readonly postRepository: PostRepository) {}

  create(createPostDto: CreatePostDto) {
    return this.postRepository.create(createPostDto);
  }

  findAll() {
    return this.postRepository.findAll();
  }

  findOne(id: number) {
    return this.postRepository.findOne(id);
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return this.postRepository.update(id, updatePostDto);
  }

  remove(id: number) {
    return this.postRepository.remove(id);
  }
}
