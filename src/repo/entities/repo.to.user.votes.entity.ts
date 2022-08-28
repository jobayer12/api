import {
  Column,
  CreateDateColumn, DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import { ApiHideProperty } from "@nestjs/swagger";
import { User } from "../../user/user.entity";
import { DbRepo } from "./repo.entity";

@Entity({
  name: "users_to_repos_votes",
})
export class RepoToUserVotes {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column()
  public user_id!: number;

  @Column()
  public repo_id!: number;

  @CreateDateColumn({
    type: "timestamp without time zone",
    default: () => "now()",
  })
  created_at?: Date;

  @UpdateDateColumn({
    type: "timestamp without time zone",
    default: () => "now()",
  })
  updated_at?: Date;

  @DeleteDateColumn({
    type: "timestamp without time zone",
  })
  deleted_at?: Date;

  @ApiHideProperty()
  @ManyToOne(() => User, (user) => user.repoToUserVotes)
  @JoinColumn({
    name: "user_id",
    referencedColumnName: "id",
  })
  public user: User;

  @ApiHideProperty()
  @ManyToOne(() => DbRepo, (repo) => repo.repoToUserVotes)
  @JoinColumn({
    name: "repo_id",
    referencedColumnName: "id",
  })
  public repo: DbRepo;
}
