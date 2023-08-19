import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import { onError } from "@apollo/client/link/error";

const link = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.map(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );

  if (networkError) console.log(`[Network error]: ${networkError}`);
});


export const apolloClient = new ApolloClient({
  uri: "http://localhost:9000/graphql",
  link,
  cache: new InMemoryCache(),
});

export const getDrawingsQuery = gql`
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

export const getCatalogsQuery = gql`
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

export const getBomsQuery = gql`
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

export const getInventoryQuery = gql`
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

export const updateDrawingMutation = gql`
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

export const updateCatalogMutation = gql`
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

export const updateBomMutation = gql`
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

export const updateInventoryMutation = gql`
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
