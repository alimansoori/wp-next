import { gql } from '@apollo/client';

const GET_PUBLISHER_WRITER_TRANSLATOR_FOR_SEARCH = gql` 
query GET_PUBLISHER_WRITER_TRANSLATOR_FOR_SEARCH($first: Int, $search: String) {
  paPublishers(first: $first, where: {search: $search}) {
    nodes {
      name
      slug
    }
  }
  paTranslators(first: $first, where: {search: $search}) {
    nodes {
      name
      slug
    }
  }
  paWriters(first: $first, where: {search: $search}) {
    nodes {
      name
      slug
    }
  }
}
`;

export default GET_PUBLISHER_WRITER_TRANSLATOR_FOR_SEARCH;
