import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import { GraphQLClient } from "graphql-request";

const client = new GraphQLClient("http://localhost:9000/graphql");

export const apolloClient = new ApolloClient({
  uri: "http://localhost:9000/graphql",
  cache: new InMemoryCache(),
});

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
  const { data } = await apolloClient.query({
    query,
    fetchPolicy: "network-only",
  });
  return data.drawings;
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
  const { data } = await apolloClient.query({
    query,
    fetchPolicy: "network-only",
  });
  return data.catalogs;
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
  const { data } = await apolloClient.query({
    query,
    fetchPolicy: "network-only",
  });
  return data.boms;
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
  const { data } = await apolloClient.query({
    query,
    fetchPolicy: "network-only",
  });
  return data.inventories;
};

export const createDrawing = async (
  input: ICreateDrawingInput
): Promise<{ drawing: string; id: number }> => {
  const mutation = gql`
    mutation CreateDrawing($input: CreateDrawingInput!) {
      createDrawing(input: $input) {
        drawing {
          id
        }
      }
    }
  `;
  const { data } = await apolloClient.mutate({
    mutation,
    variables: { input },
  });
  const id = data.createDrawing.drawing.id;
  const drawing = data.createDrawing.drawing;
  return { id, drawing };
};

export const checkDrawingExists = async (
  number: string
): Promise<{ id: number } | null> => {
  const query = gql`
    query CheckDrawingExists($number: String!) {
      drawings(condition: { number: $number }) {
        edges {
          node {
            id
          }
        }
      }
    }
  `;
  try {
    const { data } = await apolloClient.query<{
      drawings: { edges: { node: { id: number } }[] };
    }>({
      query,
      variables: { number },
    });

    const { drawings } = data;

    if (drawings.edges.length > 0) {
      return drawings.edges[0].node;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error checking if drawing exists:", error);
    return null;
  }
};

interface ICreateCatalogInput {
  catalog: {
    description: string;
    size: string;
    length: string;
    rating: string;
    serial: string;
  };
}

export const createCatalog = async (
  input: ICreateCatalogInput
): Promise<{ catalog: string; id: number }> => {
  const mutation = gql`
    mutation CreateCatalog($input: CreateCatalogInput!) {
      createCatalog(input: $input) {
        catalog {
          id
        }
      }
    }
  `;
  const { data } = await apolloClient.mutate({
    mutation,
    variables: { input },
  });
  const id = data.createCatalog.catalog.id;
  const catalog = data.createCatalog.catalog;
  return { id, catalog };
};

interface ICreateBomInput {
  bom: {
    drawing: number;
    catalog: number;
    tag: string;
    alias: string;
  };
}

export const createBom = async (
  input: ICreateBomInput
): Promise<{ bom: string; id: number }> => {
  const mutation = gql`
    mutation CreateBom($input: CreateBomInput!) {
      createBom(input: $input) {
        bom {
          id
        }
      }
    }
  `;
  const { data } = await apolloClient.mutate({
    mutation,
    variables: { input },
  });
  const id = data.createBom.bom.id;
  const bom = data.createBom.bom;
  return { id, bom };
};

interface ICreateInventoryInput {
  inventory: {
    bom: number;
    purchased: number;
  };
}

export const createInventory = async (
  input: ICreateInventoryInput
): Promise<ICreateInventoryInput> => {
  const mutation = gql`
    mutation CreateInventory($input: CreateInventoryInput!) {
      createInventory(input: $input) {
        inventory {
          id
        }
      }
    }
  `;
  const { data } = await apolloClient.mutate({
    mutation,
    variables: { input },
  });
  const inventory = data.createInventory.inventory;
  return { inventory };
};

export const deleteDrawing = async (id: number): Promise<void> => {
  const mutation = gql`
    mutation DeleteDrawing($input: DeleteDrawingInput!) {
      deleteDrawing(input: $input) {
        drawing {
          id
        }
      }
    }
  `;
  try {
    const variables = {
      input: { id },
    };

    const response = await apolloClient.mutate<{
      deleteDrawing: {
        drawing: { id: number };
      };
    }>({
      mutation,
      variables,
    });

    if (response.data) {
      const deletedDrawing = response.data.deleteDrawing.drawing;
      console.log("Drawing deleted successfully:", deletedDrawing);
    } else {
      console.error("Failed to delete drawing: Invalid response data");
    }
  } catch (error) {
    console.error("Failed to delete drawing", error);
  }
};

export const deleteCatalog = async (id: number): Promise<void> => {
  const mutation = gql`
    mutation DeleteCatalog($input: DeleteCatalogInput!) {
      deleteCatalog(input: $input) {
        catalog {
          id
        }
      }
    }
  `;
  try {
    const variables = {
      input: { id },
    };

    const response = await apolloClient.mutate<{
      deleteCatalog: {
        catalog: { id: number };
      };
    }>({
      mutation,
      variables,
    });

    if (response.data) {
      const deletedCatalog = response.data.deleteCatalog.catalog;
      console.log("Catalog deleted successfully:", deletedCatalog);
    } else {
      console.error("Failed to delete catalog: Invalid response data");
    }
  } catch (error) {
    console.error("Failed to delete catalog", error);
  }
};

export const deleteBom = async (id: number): Promise<void> => {
  const mutation = gql`
    mutation DeleteBom($input: DeleteBomInput!) {
      deleteBom(input: $input) {
        bom {
          id
        }
      }
    }
  `;
  try {
    const variables = {
      input: { id },
    };

    const response = await apolloClient.mutate<{
      deleteBom: {
        bom: { id: number };
      };
    }>({
      mutation,
      variables,
    });

    if (response.data) {
      const deletedBom = response.data.deleteBom.bom;
      console.log("Bom deleted successfully:", deletedBom);
    } else {
      console.error("Failed to delete bom: Invalid response data");
    }
  } catch (error) {
    console.error("Failed to delete bom", error);
  }
};

export const deleteInventory = async (id: number): Promise<void> => {
  const mutation = gql`
    mutation DeleteInventory($input: DeleteInventoryInput!) {
      deleteInventory(input: $input) {
        inventory {
          id
        }
      }
    }
  `;
  try {
    const variables = {
      input: { id },
    };

    const response = await apolloClient.mutate<{
      deleteInventory: {
        inventory: { id: number };
      };
    }>({
      mutation,
      variables,
    });

    if (response.data) {
      const deletedInventory = response.data.deleteInventory.inventory;
      console.log("Inventory deleted successfully:", deletedInventory);
    } else {
      console.error("Failed to delete inventory: Invalid response data");
    }
  } catch (error) {
    console.error("Failed to delete inventory", error);
  }
};

export const updateDrawing = async (row: IDrawingGridRow): Promise<void> => {
  const mutation = gql`
    mutation UpdateDrawing($input: UpdateDrawingInput!) {
      updateDrawing(input: $input) {
        drawing {
          id
          description
          number
        }
      }
    }
  `;
  try {
    const rowCopy = { ...row };

    const input = {
      id: rowCopy.id,
      patch: rowCopy,
    };

    const response = await apolloClient.mutate({
      mutation,
      variables: { input },
    });

    const updatedDrawing = response.data.updateDrawing.drawing;

    if (updatedDrawing) {
      console.log("Drawing updated successfully:", updatedDrawing);
    }
  } catch (error) {
    console.error("Failed to update Drawing", error);
  }
};

export const updateCatalog = async (row: ICatalogGridRow): Promise<void> => {
  const mutation = gql`
    mutation UpdateCatalog($input: UpdateCatalogInput!) {
      updateCatalog(input: $input) {
        catalog {
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
  try {
    const input = {
      id: row.id,
      patch: { ...row },
    };

    const response: {
      updateCatalog: {
        catalog: {
          id: number;
          description: string;
          size: string;
          length: number;
          rating: string;
          serial: string;
        } | null;
      };
    } = await client.request(mutation, { input });

    if (response.updateCatalog === null) {
      console.error("Failed to update catalog. Null response received.");
      return;
    }

    const updatedCatalog = response.updateCatalog.catalog;

    if (updatedCatalog) {
      console.log("Catalog updated successfully:", updatedCatalog);
    }
  } catch (error) {
    console.error("Failed to update Catalog", error);
  }
};

export const updateBom = async (row: IBomGridRow): Promise<void> => {
  const mutation = gql`
    mutation UpdateBom($input: UpdateBomInput!) {
      updateBom(input: $input) {
        bom {
          id
          drawing
          catalog
          tag
          alias
        }
      }
    }
  `;
  try {
    const input = {
      id: row.id,
      patch: { ...row },
    };

    const response: {
      updateBom: {
        bom: {
          id: number;
          drawing: number;
          catalog: number;
          tag: string;
          alias: string;
        } | null;
      };
    } = await client.request(mutation, { input });

    if (response.updateBom === null) {
      console.error("Failed to update bom. Null response received.");
      return;
    }

    const updatedBom = response.updateBom.bom;

    if (updatedBom) {
      console.log("Bom updated successfully:", updatedBom);
    }
  } catch (error) {
    console.error("Failed to update Bom", error);
  }
};

export const updateInventory = async (
  row: IInventoryGridRow
): Promise<void> => {
  const mutation = gql`
    mutation UpdateInventory($input: UpdateInventoryInput!) {
      updateInventory(input: $input) {
        inventory {
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

  try {
    const input = {
      id: row.id,
      patch: { ...row },
    };

    const response: {
      updateInventory: {
        inventory: {
          id: number;
          bom: number;
          purchased: number;
          received: number;
          outstanding: number;
          issued: number;
          remaining: number;
        } | null;
      };
    } = await client.request(mutation, { input });

    if (response.updateInventory === null) {
      console.error("Failed to update inventory. Null response received.");
      return;
    }

    const updatedInventory = response.updateInventory.inventory;

    if (updatedInventory) {
      console.log("Inventory updated successfully:", updatedInventory);
    }
  } catch (error) {
    console.error("Failed to update inventory", error);
  }
};
