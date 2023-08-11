import { GraphQLClient, gql } from "graphql-request";

const client = new GraphQLClient("http://localhost:9000/graphql");

export const getDrawings = async (): Promise<IDrawingData> => {
  const query = gql`
    query {
      drawings {
        nodes {
          id
          number
          description
        }
      }
    }
  `;
  const { drawings } = await client.request<{ drawings: any }>(query);
  return drawings;
};

export const getCatalogs = async (): Promise<ICatalogData> => {
  const query = gql`
    query {
      catalogs {
        nodes {
          id
          description
          size
          length
          rating
          serial
        }
      }
    }
  `;
  const { catalogs } = await client.request<{ catalogs: any }>(query);
  return catalogs;
};

export const getBoms = async (): Promise<IBomData> => {
  const query = gql`
    query {
      boms {
        nodes {
          id
          drawing
          catalog
          tag
          alias
        }
      }
    }
  `;
  const { boms } = await client.request<{ boms: any }>(query);
  return boms;
};

export const getInventories = async (): Promise<IInventoryData> => {
  const query = gql`
    query {
      inventories {
        nodes {
          id
          bom
          purchased
          received
          outstanding
          issued
          remaining
        }
      }
    }
  `;
  const { inventories } = await client.request<{ inventories: any }>(query);
  return inventories;
};
