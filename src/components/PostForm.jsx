import { useForm } from "react-hook-form";
import Input from "./Input";
import Select from "./Select";
import RTE from "./RTE";
import Button from "./Button";
import postService from "../appWrite/postService";
import { useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function PostForm({ post }) {
    const { register, handleSubmit, setValue, getValues, watch, control } = useForm({
      defaultValues: {
        title: post?.title || "",
        content: post?.content || "",
        slug: post?.slug || "",
        status: post?.status || "",
      },
    });
    const userData = useSelector((state) => state.auth.userData);
    const navigate = useNavigate();
  
    const submit = async (data) => {
      if (post) {
        try {
          await postService.deletePost(post.$id);
          await postService.deleteFile(post.featuredImage);
          data.slug = post.$id;
        } catch (error) {
          console.log(error);
        }
      }
      const file = data?.image[0] ? await postService.uploadImage(data.image[0]) : null;
      if (file) {
        const fileId = file.$id;
        try {
          const db = await postService.createPost({
            ...data,
            userID: userData.$id,
            featuredImage: fileId,
          });
          if (db) navigate(`/post/${data.slug}`);
        } catch (error) {
          console.log(error);
        }
      }
    };
  
    const slugTransform = useCallback((value) => {
      if (value && typeof value === "string") {
        return value
          .trim()
          .toLowerCase()
          .replace(/[^a-zA-Z\d\s]+/g, "-")
          .replace(/\s/g, "-");
      }
      return "";
    }, []);
  
    useEffect(() => {
      const subscribe = watch((value, { name }) => {
        if (name === "title") {
          setValue("slug", slugTransform(value.title), { shouldValidate: true });
        }
      });
    }, [watch, setValue, slugTransform]);
  
    return (
      <form
        onSubmit={handleSubmit(submit)}
        className="flex my-6 flex-col lg:flex-row justify-between lg:space-x-8"
        style={{ padding: "0 10%" }} // Add padding on mobile
      >
        <div className="flex-1">
          <Input
            label="Title: "
            type="text"
            placeholder="title...."
            {...register("title", { required: true })}
          />
          <RTE
            label="Content: "
            name="content"
            control={control}
            defaultValue={getValues("content")}
          />
        </div>
  
        <div className="lg:w-1/3 flex flex-col space-y-4 mt-6 lg:mt-0">
          <Input
            type="file"
            className="mb-4"
            label="Image"
            accept="image/png , image/jpg , image/jpeg, image/gif"
            {...register("image")}
          />
          {post && (
            <img
              src={postService.getImagePreview(post.featuredImage)}
              alt={post.title}
              className="mt-4"
            />
          )}
          <Select
            label="Status: "
            options={["Active", "InActive"]}
            className='h-8'
            {...register("status", { required: true })}
          />
           <Button
            type="submit"
            className="w-full py-3 text-white bg-green-500 hover:bg-green-600 transition-all duration-300 ease-in-out rounded-lg shadow-md transform hover:scale-105 focus:ring focus:ring-green-300"
          >
            {post ? "Update Post" : "Submit Post"}
          </Button>

          <Button
            type="button"
            className="w-full py-3 mb-4 text-white bg-gray-500 hover:bg-gray-600 transition-all duration-300 ease-in-out rounded-lg shadow-md transform hover:scale-105 focus:ring focus:ring-gray-300"
            onClick={() => navigate("/")}
          >
            Cancel
          </Button>
        </div>
      </form>
    );
  }
  
  export default PostForm;
  