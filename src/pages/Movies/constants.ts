import * as yup from 'yup';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
export const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export const AddMovieSchema = yup.object().shape({
  genres: yup.array().of(yup.string().required()).required(),
  actors: yup.array().of(yup.string().required()).required(),
  description: yup.string().required(),
  imageUrl: yup.string().required(),
  videoUrl: yup.string().required(),
  country: yup.string().required(),
  rating: yup.number().required(),
  title: yup.string().required(),
  year: yup.number().required(),
});
