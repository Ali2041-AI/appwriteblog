import { Account, Client, ID } from "appwrite";
import conf from "./conf";

class Auth{

    client=new Client();
    account;


    constructor(){
        this.client
        .setEndpoint(conf.APPWRITE_URL)
        .setProject(conf.APPWRITE_PROJECT_ID);
        this.account=new Account(this.client);
    }

    async createAccount({name,email,password}){

        try {
            const User=await this.account.create(ID.unique(),email,password,name)
            return User;
            
        } catch (error) {
            console.log("APPWRITE SERVICE :: CREATEACCOUNT ::",error)
            throw error;
        }
    
    }
    
    async login({email,password}){
        try {
            const User=await this.account.createEmailPasswordSession(email,password);
            return User;
        
        } catch (error) {
            throw error;
        }
    }
    async getLoginUser(){
        try {
            const user=await this.account.get();
            return user;

        } catch (error) {
            console.log(`here inside the getUser`,error);
            throw error;
        }
    }

    async logOut(){
        try {
            await this.account.deleteSession('current');
            return true;
        } catch (error) {
           throw error; 
           return false;           
        }
    }











}
export default  new Auth();