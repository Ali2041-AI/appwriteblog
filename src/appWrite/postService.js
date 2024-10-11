import { Client, Databases,Storage,ID,Query } from "appwrite";
import conf from "./conf";

class PostSerive{

    client=new Client();
    database;
    storage;

    constructor(){
        this.client
        .setEndpoint(conf.APPWRITE_URL)
        .setProject(conf.APPWRITE_PROJECT_ID)
        this.database=new Databases(this.client);
        this.storage=new Storage(this.client);
    }

    async createPost({title,slug,userID,content,status,featuredImage}){
        try {
            const post=await this.database.createDocument(
                conf.APPWRITE_DATABASE_ID,
                conf.APPWRITE_COLLECTION_ID,
                slug,
                {
                    title,
                    content,
                    status,
                    featuredImage,
                    userID
                }
            )
            return post;
            
        } catch (error) {
            throw error;  
        }
    }

    async getPost(slug){

        try {
            const post=await this.database.getDocument(conf.APPWRITE_DATABASE_ID,conf.APPWRITE_COLLECTION_ID,slug)
            return post;
            
        } catch (error) {
            console.log(error);
        }


    }
    async deletePost(slug){
        try {
            await this.database.deleteDocument(conf.APPWRITE_DATABASE_ID,conf.APPWRITE_COLLECTION_ID,slug);
            return true;
        } catch (error) {
            console.log(" Appwrite service :: deletePost :: error",error);
            return false;
        }
    }

    async getPosts(queries=[Query.equal("status","active")]){
        try {
            return await this.database.listDocuments(
                conf.APPWRITE_DATABASE_ID,
                conf.APPWRITE_COLLECTION_ID,
                queries
            )
            
        } catch (error) {
            console.log("Appwrite Serive :: getPosts :: error",error)
            
        }
    }
    async uploadImage(image){
        try {
            const featuredImage=this.storage.createFile(conf.APPWRITE_STORAGE_ID,ID.unique(),image)
            return featuredImage
            
        } catch (error) {
            throw error
        }
    }
    async deleteFile(featuredImageID){
        try {
            await this.storage.deleteFile(conf.APPWRITE_STORAGE_ID,featuredImageID);
            return true;
            
        } catch (error) {
            throw error;            
        }
    }
     getImagePreview(featuredImageID){
        try {
            const Image=this.storage.getFilePreview(
                conf.APPWRITE_STORAGE_ID,
                featuredImageID
            )
            return Image;

            
        } catch (error) {
            throw error;
        }

    }





}

export default new PostSerive();