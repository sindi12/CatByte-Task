import {StackNavigationProp} from '@react-navigation/stack';
import {HomeStackParamList} from './navigation/AppStack';

export interface ItemReturnType {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  image: string;
  company: {
    address: string;
    postalCode: string;
    state: string;
  };
}

export interface ItemType extends ItemReturnType {
  onPress: () => void;
  onRemove: () => void;
}

export interface HomeState {
  loading: boolean;
  users: ItemType[];
  error?: string | null;
  lastId: number;
}

export interface ErrorState {
  name: string;
  message: string;
}

export type HomeScreenNavigationProp = StackNavigationProp<
  HomeStackParamList,
  'HomeScreen'
>;

export type UserData = Omit<ItemReturnType, 'id'>;

export interface PostUserData {
  firstName: string;
  lastName: string;
  age: string;
  image: string;
  address: string;
  postalCode: string;
  state: string;
}
