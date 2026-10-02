import { useState } from "react";
import {
  ChevronDown,
  ChevronRight,
  Folder,
  FolderOpen,
 
} from "lucide-react";

import styles from "./CollectionsTree.module.css";

type Collection = {
  name: string;
  count?: number;
  children?: {
    name: string;
    count?: number;
  }[];
};

const collections: Collection[] = [
  {
    name: "Users",
    count: 2,
    children: [
      {
        name: "GraphQL",
        count: 1,
      },
    ],
  },
  {
    name: "Auth",
    count: 1,
  },
  {
    name: "Products",
    count: 1,
  },
  {
    name: "Checkout",
    count: 1,
  },
];

export function CollectionsTree() {
  const [openCollections, setOpenCollections] = useState<string[]>(["Users"]);

  const toggleCollection = (name: string) => {
    setOpenCollections((current) =>
      current.includes(name)
        ? current.filter((item) => item !== name)
        : [...current, name],
    );
  };

  return (
    <div className={styles.tree}>
      {collections.map((collection) => {
        const isOpen = openCollections.includes(collection.name);
        const hasChildren = Boolean(collection.children?.length);

        return (
          <div key={collection.name}>
            <button
              className={styles.collection}
              onClick={() => hasChildren && toggleCollection(collection.name)}
            >
              <span className={styles.arrow}>
                {hasChildren &&
                  (isOpen ? (
                    <ChevronDown size={12} />
                  ) : (
                    <ChevronRight size={12} />
                  ))}
              </span>

              {isOpen && hasChildren ? (
                <FolderOpen size={15} />
              ) : (
                <Folder size={15} />
              )}

              <span className={styles.name}>{collection.name}</span>

              {collection.count !== undefined && (
                <span className={styles.count}>{collection.count}</span>
              )}
            </button>

            {isOpen && collection.children && (
              <div className={styles.children}>
                {collection.children.map((child) => (
                  <button key={child.name} className={styles.child}>
                    <Folder size={14} />

                    <span>{child.name}</span>

                    {child.count !== undefined && (
                      <span className={styles.count}>{child.count}</span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
