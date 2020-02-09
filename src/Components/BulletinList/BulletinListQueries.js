import { gql } from "apollo-boost";

export const SEE_BULLETIN_LIST = gql`
  query seeBulletinList($announcement: Boolean!, $classifyNum: Int!) {
    seeBulletinList(announcement: $announcement, classifyNum: $classifyNum)
  }
`;
