import { Alert, Button, FileInput, Select, TextInput } from 'flowbite-react';
import { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { app } from '../firabase';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useNavigate, useParams } from 'react-router-dom';

const UpdatePost = () => {
  const navigate = useNavigate();
  const [postImage, setPostImage] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [imageFileUrl, setImageFileUrl] = useState(null);

  const [imageUploadProgress, setImageUploadProgress] = useState(null);

  const [imageUploadError, setImageUploadError] = useState(null);
  const [formData, setFormData] = useState({});
  const [publishError, setPublishError] = useState(null);
  const { postId } = useParams();

  useEffect(() => {
    try {
      const fetchPost = async () => {
        const res = await fetch(`/api/post?postId=${postId}`);
        const data = await res.json();
        if (!res.ok) {
          console.log(data.message);
          setPublishError(data.message);
          return;
        }
        setFormData(data.posts[0]);
      };

      fetchPost();
    } catch (error) {
      setPublishError(error.message);
    }
  }, [postId]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPostImage(file);
      setImageFileUrl(URL.createObjectURL(file));
    }
  };

  const handleUploadImage = async () => {
    try {
      if (!postImage) {
        setImageUploadError('Please select an image');
        return;
      }
      setImageUploadError(null);
      const storage = getStorage(app);
      const fileName = new Date().getTime() + '-' + postImage.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, postImage);
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImageUploadProgress(progress.toFixed(0));
        },
        // eslint-disable-next-line no-unused-vars
        (error) => {
          setImageUploadError('Image upload failed');
          setImageUploadProgress(null);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageUploadProgress(null);
            setImageUploadError(null);
            setFormData({ ...formData, image: downloadURL });
          });
        }
      );
    } catch (error) {
      setImageUploadError('Image upload failed');
      setImageUploadError(null);
      console.log(error);
    }
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/post/${formData._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        setPublishError(data.message);
        return;
      }
      navigate(`/post/${data.slug}`);
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      setPublishError('Something went wrong!');
    }
  };

  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-center text-3xl my-7 font-semibold">Update post</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <TextInput
            type="text"
            placeholder="Title"
            required
            id="title"
            className="flex-1"
            onChange={handleChange}
            value={formData.title}
          />
          <Select
            id="category"
            onChange={handleChange}
            value={formData.category}
          >
            <option value="uncategorized">Select a category</option>
            <option value="javascript">Javascript</option>
            <option value="reactjs">React.js</option>
            <option value="nextjs">Next.js</option>
          </Select>
        </div>
        <div className="flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3">
          <FileInput
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
          <Button
            type="button"
            gradientDuoTone="purpleToBlue"
            size="sm"
            outline
            onClick={handleUploadImage}
            disabled={imageUploadProgress}
          >
            {imageUploadProgress ? (
              <div className="w-16 h-16">
                <CircularProgressbar
                  value={imageUploadProgress}
                  text={`${imageUploadProgress || 0}%`}
                />
              </div>
            ) : (
              'Upload Image'
            )}
          </Button>
        </div>
        {formData.image && (
          <div className="relative">
            <span
              onClick={() => setPostImage(null)}
              className="absolute right-0 text-xl mr-2 text-red-500 hover:text-red-600 cursor-pointer"
            >
              X
            </span>
            <img src={formData.image} className="w-full h-80 object-cover" />
          </div>
        )}
        {imageUploadError && <Alert color="failure">{imageUploadError}</Alert>}
        <ReactQuill
          id="content"
          theme="snow"
          placeholder="Write somthing..."
          className="h-72 mb-12"
          required
          onChange={(value) => setFormData({ ...formData, content: value })}
          value={formData.content}
        />
        <Button type="submit" gradientDuoTone="purpleToPink">
          Update
        </Button>
        {publishError && <Alert color="failure">{publishError}</Alert>}
      </form>
    </div>
  );
};

export default UpdatePost;
