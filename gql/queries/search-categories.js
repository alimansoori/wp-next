import gql from "graphql-tag";

/**
 * GraphQL categories query.
 */
const SEARCH_CATEGORIES = gql`
fragment parentCategory on ProductCategory {
	id
	key: id
	databaseId
	name
	title: name
	parent {
		node {
			id
			key: id
			databaseId
			name
			title: name
			parentDatabaseId
			parentId
			productCategoryId
			uri
			slug
		}
	}
	parentDatabaseId
	parentId
	productCategoryId
	uri
	slug
}

fragment pCategory on ProductCategory {
	id
	key: id
	databaseId
	name
	title: name
	parent {
		node {
		...parentCategory
		}
	}
	parentDatabaseId
	parentId
	productCategoryId
	uri
	slug
}

query ProductCategories($first: Int) {
	productCategories(first: $first) {
		edges {
			cursor
			node {
				...pCategory       
			}
		}
	}
}
`;

export default SEARCH_CATEGORIES;
