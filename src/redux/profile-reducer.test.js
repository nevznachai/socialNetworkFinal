import profileReducer, { addPostActionCreator, deletePost } from "./profile-reducer";
import React from 'react';


let state = {
    posts: [
        { id: 1, message: 'oh, hi Mark', likesCount: 15 },
        { id: 2, message: 'is it instagram?', likesCount: 20 }
    ],
}


test('length must be increase', () => {
    let action = addPostActionCreator('jopa')
    let newState = profileReducer(state, action)
     expect(newState.posts.length).toBe(3);
});

test('add messsage', () => {
    let action = addPostActionCreator('jopa')
    let newState = profileReducer(state, action)
     expect(newState.posts[2].message).toBe('jopa');
});

test('delete post and lenght', () => {
    let action = deletePost(1);
    let newState = profileReducer(state, action)
    expect(newState.posts.length).toBe(1);
});
test('incorrect', () => {
    let action = deletePost(1000);
    let newState = profileReducer(state, action)
    expect(newState.posts.length).toBe(2);
});
