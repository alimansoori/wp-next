import gql from "graphql-tag";

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
  

fragment relatedFRG on ProductToProductConnection {
	nodes {
		id
		name
		slug
		databaseId
		averageRating
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
  }

query Product($id: ID!) {
	product(id: $id, idType: SLUG) {
	  id
	  databaseId
	  averageRating
	  slug
	  description
	  shortDescription
	  seo {
        title
		metaDesc
		metaKeywords
		canonical
		opengraphTitle
		opengraphUrl
		opengraphSiteName
		opengraphType
		opengraphPublisher
		opengraphPublishedTime
		opengraphModifiedTime
		opengraphImage {
			sourceUrl
		}
		twitterTitle
		twitterDescription
		twitterImage {
			sourceUrl
		}
      }
	  related {
		...relatedFRG
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
	  paBookSeriesPrints {
		nodes {
		  name
		}
	  }
	  paDimensions {
		nodes {
		  name
		}
	  }
	  paCoverTypes {
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
`;

export default PRODUCT_BY_SLUG_QUERY;
