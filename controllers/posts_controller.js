const Posts = require("../models/posts");
const Comments = require("../models/comments");
const Likes = require("../models/likes");

module.exports.addPost = async function (request, response) {
  try {
    let post = await Posts.create({
      content: request.body.content,
      user: request.user._id,
    });

    post = await post.populate("user", "name");

    if (request.xhr) {
      return response.status(200).json({
        post: post,
        message: "Post Created",
      });
    }
    //Coomented these two lines when added the above AJAX
    // request.flash("successs" , "Post Created Successfully");
    // return response.redirect("back");
  } catch (error) {
    request.flash("error", error);
    return response.redirect("back");
  }
};

module.exports.deletePost = async function (req, res) {
  try {
    let post = await Posts.findById(req.params.id);

    if (post.user == req.user.id) {
      let po = await Posts.deleteOne({ _id: req.params.id });
      // post.remove();

      await Comment.deleteMany({ post: req.params.id });


      if (req.xhr) {
        return res.status(200).json({
          data: {
            post_id: req.params.id
          },
          message: "Post deleted"
        });
      }

      req.flash('success', 'Post and associated comments deleted!');

      return res.redirect('back');
    } else {
      req.flash('error', 'You cannot delete this post!');
      return res.redirect('back');
    }

  } catch (err) {
    req.flash('error', err);
    return res.redirect('back');
  }
};
