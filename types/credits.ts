export interface CastMember {
  id: number;
  name: string;
  character: string;
  profileUrl: string | null;
  order: number;
}

export interface CrewMember {
  id: number;
  name: string;
  job: string;
  department: string;
  profileUrl: string | null;
}

export interface Credits {
  cast: CastMember[];
  crew: CrewMember[];
}
