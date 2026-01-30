import React, { useState } from 'react'
import AiModelList from "../../shared/AiIModelList";
import AiIModelList from '../../shared/AiIModelList';
import Image from 'next/image';
function AiMultiModels() {
    const [aiModelList, setAiModelList]=useState(AiIModelList);
  return (
    <div className="flex flex-1 has-[75vh] border-b">
      {aiModelList.map((model, index) => (
        <div key={index}>
          <div> 
          <Image src={model.icon} alt={model.model} width={24} height={24}/>
          </div>
        </div>
      ))}
    </div>
  );
}

export default AiMultiModels