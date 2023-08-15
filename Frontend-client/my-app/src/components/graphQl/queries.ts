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
  const { createDrawing } = await client.request<any>(mutation, { input });
  const drawing = createDrawing.drawing;
  const id = drawing.id;
  return { drawing, id };
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
    const { drawings } = await client.request<{
      drawings: { edges: { node: { id: number } }[] };
    }>(query, {
      number,
    });

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
  const { createCatalog } = await client.request<any>(mutation, { input });
  const catalog = createCatalog.catalog;
  const id = catalog.id;
  return { catalog, id };
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
  const { createBom } = await client.request<any>(mutation, { input });
  const bom = createBom.bom;
  const id = bom.id;
  return { bom, id };
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
  const { createInventory } = await client.request<any>(mutation, { input });
  return createInventory.inventory;
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

    const response: {
      deleteDrawing: {
        drawing: { id: number };
      };
    } = await client.request(mutation, variables);
    const deletedDrawing = response.deleteDrawing.drawing;

    console.log("Drawing deleted successfully:", deletedDrawing);
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

    const response: {
      deleteCatalog: {
        catalog: { id: number };
      };
    } = await client.request(mutation, variables);
    const deletedCatalog = response.deleteCatalog.catalog;

    console.log("Catalog deleted successfully:", deletedCatalog);
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

    const response: {
      deleteBom: {
        bom: { id: number };
      };
    } = await client.request(mutation, variables);
    const deletedBom = response.deleteBom.bom;

    console.log("Bom deleted successfully:", deletedBom);
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

    const response: {
      deleteInventory: {
        inventory: { id: number };
      };
    } = await client.request(mutation, variables);
    const deletedInventory = response.deleteInventory.inventory;

    console.log("Inventory deleted successfully:", deletedInventory);
  } catch (error) {
    console.error("Failed to delete inventory", error);
  }
};

export const updateDrawing = async(
  row: IDrawingGridRow
): Promise<void> => {
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
    const input = {
      id: row.id,
      patch: { ...row },
    };
    
    const response: {
      updateDrawing: {
        drawing: {
          id: number;
          description: string;
          number: string;
        } | null;
      };
    } = await client.request(mutation, { input });

    if (response.updateDrawing === null) {
      console.error("Failed to update drawing. Null response received.");
      return;
    }

    const updatedDrawing = response.updateDrawing.drawing;

     if (updatedDrawing) {
      console.log("Drawing updated successfully:", updatedDrawing);
    }
  } catch (error) {
    console.error("Failed to update Drawing", error);
  }
};


export const updateCatalog = async( 
  row: ICatalogGridRow
): Promise<void> => {
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

export const updateBom = async(
  row: IBomGridRow
): Promise<void> => {
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
