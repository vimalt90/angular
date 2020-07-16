export class CastCrew {
  casts: Cast[];
  crews: Crew[];
}

export class Cast {
  cineastName: string;
  imgURL: any;
  cineastRoles: CineastRoles[];
}

export class CineastRoles {
  cineastRoleName: string;
  cineastRoleDescription: string;
  cinestRoleId: number;
  type: string;
}

export class Crew {
  cineastName: string;
  imgURL: any;
  cineastRoles: CineastRoles[];
}
