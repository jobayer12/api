import {
  Entity,
  Column,
  BaseEntity,
  PrimaryColumn,
  OneToMany,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn
} from "typeorm";
import { ApiHideProperty } from "@nestjs/swagger";

import { DbRepo } from "../repo/entities/repo.entity";
import { RepoToUserVotes } from "../repo/entities/repo.to.user.votes.entity";
import { RepoToUserStars } from "../repo/entities/repo.to.user.stars.entity";
import { RepoToUserSubmissions } from "../repo/entities/repo.to.user.submissions.entity";
import { RepoToUserStargazers } from "../repo/entities/repo.to.user.stargazers.entity";

@Entity({
  name: "users"
})
export class User extends BaseEntity {
  @PrimaryColumn("bigint")
  id: number;

  @Column({
    type: "bigint",
    default: 0,
  })
  open_issues: number;

  @Column({ default: false })
  has_stars_data: boolean;

  @Column({ default: false })
  is_private: boolean;

  @Column({ default: false })
  is_open_sauced_member: boolean;

  @CreateDateColumn({
    type: "timestamp without time zone",
    default: () => "now()",
  })
  created_at: Date;

  @UpdateDateColumn({
    type: "timestamp without time zone",
    default: () => "now()",
  })
  updated_at: Date;

  @DeleteDateColumn({
    type: "timestamp without time zone",
  })
  deleted_at: Date;

  @ApiHideProperty()
  @OneToMany(() => DbRepo, repo => repo.user)
  repos: DbRepo[];

  @ApiHideProperty()
  @OneToMany(() => RepoToUserVotes, repoToUserVotes => repoToUserVotes.user)
  repoToUserVotes: RepoToUserVotes[];

  @ApiHideProperty()
  @OneToMany(() => RepoToUserStars, repoToUserStars => repoToUserStars.user)
  repoToUserStars: RepoToUserStars[];

  @ApiHideProperty()
  @OneToMany(() => RepoToUserSubmissions, repoToUserSubmissions => repoToUserSubmissions.user)
  repoToUserSubmissions: RepoToUserSubmissions[];

  @ApiHideProperty()
  @OneToMany(() => RepoToUserStargazers, repoToUserStargazers => repoToUserStargazers.user)
  repoToUserStargazers: RepoToUserStargazers[];
}
