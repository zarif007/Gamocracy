import React from "react";
import blogInterface from "../Interfaces/BlogInterface";
import BlogContentForTimeline from "./blogComponents/BlogContentForTimeline";
import PostContentForTimeline from "./postComponents/PostContentForTimeline";
import postInterface from './../Interfaces/PostInterface';

const Redirector = ({ props }: any) => {
  return (
    <div className="m-2">
      {props.length > 0 && props.map((prop: any, index: number) => {
        return (
            <>
                {
                    prop.type === "blog" ? <BlogContentForTimeline key={index} blog={prop} /> : 
                    (prop.type === "post" ? <PostContentForTimeline post={prop} /> : <></> )
                }
            </>
        )
      })}
    </div>
  );
};

export default Redirector;
