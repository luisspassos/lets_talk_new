import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react';
import { AiOutlineClockCircle } from 'react-icons/ai';
import { emojiCategories } from '../../utils/emojiCategories';

type EmojiType = string;

export type EmojiObj = { emoji: EmojiType; testId: string };

export type Emoji = EmojiType | EmojiObj;

type EmojiCategory = (typeof emojiCategories)[number];

type Category = Omit<EmojiCategory, 'emojis'> & {
  emojis: Emoji[];
};

type CategoriesProviderProps = {
  children: ReactNode;
};

type CategoriesContextType = {
  categories: {
    data: Category[];
    set: Dispatch<SetStateAction<Category[]>>;
  };
};

export const createRecentCategory = (
  emojis: Category['emojis'] = []
): Category => ({
  name: 'Recentes',
  icon: AiOutlineClockCircle,
  emojis,
  testId: 'recent',
});

export const CategoriesContext = createContext({} as CategoriesContextType);

export function CategoriesProvider({ children }: CategoriesProviderProps) {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    function fillCategories() {
      const newCategories: Category[] = emojiCategories.map(
        ({ emojis, ...rest }) => ({
          ...rest,
          emojis: emojis.map(({ emoji }) => emoji),
        })
      );

      function addRecentCategory() {
        const localStorageData = localStorage.getItem('recentlyUsedEmojis');

        if (!localStorageData) return;

        const emojis: Category['emojis'] = JSON.parse(localStorageData);

        const category = createRecentCategory(emojis);

        newCategories.unshift(category);
      }

      addRecentCategory();

      setCategories(newCategories);
    }

    fillCategories();
  }, []);

  return (
    <CategoriesContext.Provider
      value={{ categories: { set: setCategories, data: categories } }}
    >
      {children}
    </CategoriesContext.Provider>
  );
}

export function useCategories() {
  const data = useContext(CategoriesContext);

  return data;
}
