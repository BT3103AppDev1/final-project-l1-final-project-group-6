import app from '../../../../firebase';
import { getFirestore, query, collection, where, orderBy, getDocs } from 'firebase/firestore';

const db = getFirestore(app);
const postCollectionName = 'posts';

/**
 * Retrieves the most recent posts from the database by entity type
 *
 * @param {string} entity - The type of entity, either "Company" or "NGO".
 * @param {number} limit - The maximum number of posts to retrieve.
 */
async function getRecentPosts(entity, limit = 3) {
    //TODO: add limit. Depends on finalised sorting/storing of posts
    try {
        const q = query(collection(db, postCollectionName), where('entity', '==', entity));
        const querySnapshot = await getDocs(q);
        const posts = [];
        querySnapshot.forEach((doc) => {
            posts.push(doc.data());
        });
        return posts;
    } catch (e) {
        console.error('Error fetching posts: ', e);
        return [];
    }
}

export default getRecentPosts;
