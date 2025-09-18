"use client";

import { Tree, TreeNode } from "react-organizational-chart";
import styled from "styled-components";
import pb from "../_lib/pb";

const StyledNode = styled.div`
  border-radius: 50px;
  display: inline-block;
  background-color: white;
  padding: 5px;
  height: 32px;
  width: 52px;
`;

function OurPortfolioOrc({ brands = [] }) {
  return (
    <div className="flex justify-center overflow-auto py-8">
      <Tree
        lineWidth="2px"
        lineColor="#ccc"
        lineBorderRadius="10px"
        label={
          <div className="h-12 w-20 mx-auto bg-white rounded-2xl">
            {/* Replace with your logo if needed */}
            <img
              src="/images/logo.png"
              alt="Logo"
              className="w-12 rounded-2xl mx-auto"
            />
          </div>
        }
      >
        {brands.map((brand, i) => {
          const imageUrl = pb.files.getURL(brand, brand.logo);
          return (
            <TreeNode
              key={i}
              label={
                <div className="h-6 w-9 bg-white flex justify-center items-center rounded-sm py-1">
                  <a
                    href={`/brands/${brand.name}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img src={imageUrl} alt={brand.name} />
                  </a>
                </div>
              }
            />
          );
        })}
      </Tree>
    </div>
  );
}

export default OurPortfolioOrc;
