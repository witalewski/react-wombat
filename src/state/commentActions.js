export const SAVE_COMMENT = "SAVE_COMMENT";
export const DELETE_COMMENT = "DELETE_COMMENT";

export const saveComment = (comment,author) => ({
    type: SAVE_COMMENT,
    comment,
    author,
});

export const deleteComment = (comment) => ({
    type: DELETE_COMMENT,
    comment,
});

