import gql from "graphql-tag";
import PostTypeSeoFrg from '../fragments/post-type-seo-fragment'

const PRODUCT_BY_SLUG_QUERY = gql` 
fragment publisher on PaPublisher {
	name
}

fragment writer on PaWriter {
	name
}

fragment translator on PaTranslator {
	name
}

fragment image on MediaItem {
	id
	altText
	sourceUrl
	srcSet
	uri
  }
  

fragment related on Product {
	id
	name
	type
	slug
	databaseId
	averageRating
	description
	...on SimpleProduct {
	  price
	  regularPrice
	}
	image {
		... image
	}
	paPublishers {
	  nodes {
		...publisher
	  }
	}
	paTranslators {
	  nodes {
		...translator
	  }
	}
	paWriters {
	  nodes {
		...writer
	  }
	}
  }

query Product($id: ID!) {
	product(id: $id, idType: SLUG) {
	  id
	  databaseId
	  averageRating
	  slug
	  description
	  seo {
        ...PostTypeSeoFrg
      }
	  related {
		nodes {
			...related
		}
	  }
	  image {
		id
		uri
		title
		srcSet
		sourceUrl
	  }
	  name
	  paPublishers {
		nodes {
		  name
		}
	  }
	  paTranslators {
		nodes {
		  name
		}
	  }
	  paWriters {
		nodes {
		  name
		}
	  }
	  paBookCodes {
		nodes {
		  name
		}
	  }
	  paBookSizes {
		nodes {
		  name
		}
	  }
	  paCoverTypes {
		nodes {
		  name
		}
	  }
	  paIsbns {
		nodes {
		  name
		}
	  }
	  paNumberPages {
		nodes {
		  name
		}
	  }
	  paSolarPublishDates {
		nodes {
		  name
		}
	  }
	  ...on SimpleProduct {
			price
			id
			regularPrice
	  }
	  ... on VariableProduct {
		price
		id
	  }
	  ... on ExternalProduct {
		price
		id
		externalUrl
	  }
	  ... on GroupProduct {
		products {
		  nodes {
			... on SimpleProduct {
			  id
			  price
			}
		  }
		}
		id
	  }
	}
  }
  ${PostTypeSeoFrg.fragments.PostTypeSeoFrg}
`;

export default PRODUCT_BY_SLUG_QUERY;
