import { gql } from '@apollo/client';

const GET_CATS = gql` 
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

query ProductCategories($first: Int , $after: String) {
	productCategories(first: $first, after: $after) {
		edges {
			cursor
			node {
				...pCategory       
			}
		}
	}
}
`;

export default GET_CATS;
