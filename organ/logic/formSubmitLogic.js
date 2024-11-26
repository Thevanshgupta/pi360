import axios from 'axios';

const submitForm = async (data, api) => {
  const rs = await axios.post(api, {formData: data}).then(rs => {
    console.log(rs);
  });
  console.log(rs)
};

export default submitForm;
