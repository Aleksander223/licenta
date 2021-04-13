import React from "react";

import {Navigation} from "react-minimal-side-navigation";
import 'react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css';

import { FaHome, FaDatabase, FaKey } from "react-icons/fa";

export default function Aside() {
    return (
        <>
        <div style={{
            height: "94vh",
            backgroundColor: "#fcfcfc",
            marginTop: "-50px",
            marginLeft: "-12px"
        }}>
        <Navigation
            activeItemId="/admin"
            onSelect={({itemId}) => {
            }}
            items={[
              {
                title: 'Home',
                itemId: '/admin',
                elemBefore: () => <FaHome/>,
              },
              {
                title: 'Data',
                itemId: '/data',
                elemBefore: () => <FaDatabase/>,
                subNav: [
                  {
                    title: 'Add Data',
                    itemId: '/admin/data/add',
                  },
                  {
                    title: 'Edit Data',
                    itemId: '/admin/data/edit',
                  },
                ],
              },
              {
                title: 'Tokens',
                itemId: '/admin/tokens',
                elemBefore: () => <FaKey/>,
              },
            ]}
          />
          </div>
      </>
    );
}