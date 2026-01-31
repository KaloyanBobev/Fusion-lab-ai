import React, { useState } from 'react'

import AiIModelList from '../../shared/AiIModelList';
import Image from 'next/image';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from '@/components/ui/switch';

function AiMultiModels() {
  const [aiModelList, setAiModelList] = useState(AiIModelList);
  return (
    <div className="flex flex-1 has-[75vh] border-b">
      {aiModelList.map((model, index) => (
        <div key={index} className="flex w-full items-center justify-between">
          <div className="flex items-center gap-4">
            <Image src={model.icon} alt={model.model} width={24} height={24} />

            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder={model.subModel[0].name} />
              </SelectTrigger>
              <SelectContent>
                {model.subModel.map((subModel, index) => (
                  <SelectItem key={index} value={subModel.name}>
                    {subModel.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Switch />
          </div>
        </div>
      ))}
    </div>
  );
}

export default AiMultiModels