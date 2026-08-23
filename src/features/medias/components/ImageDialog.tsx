"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import ImagePreviewCard from "@/features/medias/components/ImagePreviewCard";
import React, { Suspense } from "react";
import UploadMediaContainer from "./UploadMediaContainer";

type Props = {
  onChange: (data: string) => void;
  defaultValue?: string;
  multiple?: boolean;
  modalOpen?: boolean;
  value?: string;
};

function ImageDialog({
  modalOpen = false,
  onChange,
  value,
  defaultValue,
}: Props) {
  const [dialogOpen, setDialogOpen] = React.useState(modalOpen);
  // const { control, setError, getValues, setValue } = useFormContext()
  // const { fields, remove, append, update, move, swap } = useFieldArray({
  //   control,
  //   name: "",
  // })
  const onClickHandler = (mediaId: string) => {
    onChange(mediaId);
    setDialogOpen(false);
  };

  return (
    <div>
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogTrigger>
          <div className="rounded-full bg-[#0d2818] border-2 border-[#0099ff] px-4 py-2 hover:border-[#d8b4fe] transition-colors cursor-pointer text-[#a855f7]">
            {value ? (
              <ImagePreviewCard
                key={value}
                onClick={() => {}}
                mediaId={value}
              />
            ) : (
              "Select / Add Image"
            )}
          </div>
        </DialogTrigger>

        <DialogContent className="max-w-[1080px] min-h-full md:min-h-[480px] bg-black border-[#0099ff]">
          <DialogHeader>
            <DialogTitle className="mb-5 text-[#a855f7]">Image Gallery</DialogTitle>
            <Suspense>
              <UploadMediaContainer
                onClickItemsHandler={onClickHandler}
                defaultImageId={defaultValue}
              />
            </Suspense>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default ImageDialog;
