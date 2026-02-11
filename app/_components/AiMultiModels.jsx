import React, { useContext, useState } from "react";

import AiIModelList from "../../shared/AiIModelList";
import Image from "next/image";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Lock, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AiSelectedModelContext } from "@/context/AiSelectedModelContext";

function AiMultiModels() {
  const [aiModelList, setAiModelList] = useState(AiIModelList);

  const { aiSelectedModels, setaiSelectedModels } = useContext(
    AiSelectedModelContext,
  );
  const onToggleChange = (model, value) => {
    setAiModelList((prev) =>
      prev.map((m) => (m.model === model ? { ...m, enable: value } : m)),
    );
  };
  return (
    <div className="flex flex-1 has-[75vh] border-b">
      {aiModelList.map((model, index) => (
        <div
          key={index}
          className={`flex flex-col border-r h-full ${
            model.enable ? `flex-1 min-w-[400px]` : `w-[100px] flex-none`
          }`}
        >
          <div className="flex w-full h-[70px] items-center justify-between border-b p-4">
            <div className="flex items-center gap-4">
              <Image
                src={model.icon}
                alt={model.model}
                width={24}
                height={24}
              />

              {model.enable && (
                <Select defalthValue={aiSelectedModels[model.model].modelId}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue
                      placeholder={aiSelectedModels[model.model].modelId}
                    />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup className="p-3">
                      <SelectLabel className="text-sm tex-gray-400">
                        Free
                      </SelectLabel>
                      {model.subModel.map(
                        (subModel, index) =>
                          subModel.premium == false && (
                            <SelectItem key={index} value={subModel.id}>
                              {subModel.name}
                              {subModel.premium && <Lock className="h-4 w-4" />}
                            </SelectItem>
                          ),
                      )}
                    </SelectGroup>

                    <SelectGroup className="px-3">
                      <SelectLabel className="text-sm tex-gray-400">
                        Premium
                      </SelectLabel>
                      {model.subModel.map(
                        (subModel, index) =>
                          subModel.premium == true && (
                            <SelectItem
                              key={index}
                              value={subModel.name}
                              disabled={subModel.premium}
                            >
                              {subModel.name}
                            </SelectItem>
                          ),
                      )}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            </div>
            <div>
              {model.enable ? (
                <Switch
                  checked={model.enable}
                  onCheckedChange={(v) => onToggleChange(model.model, v)}
                />
              ) : (
                <MessageSquare
                  onClick={() => onToggleChange(model.model, true)}
                />
              )}
            </div>
          </div>
          {model.premium && model.enable && (
            <div className="flex items-center justify-center h-full">
              <Button>
                <Lock /> Upgrade to unlock
              </Button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default AiMultiModels;
