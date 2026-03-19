"use client";

import {
  updateInfiniteItem,
  updateInfiniteItemsHeading,
} from "@/app/lib/actions";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import DropzoneImage from "@/components/dropzone-image";

import {
  Edit,
  Loader2,
  ImageIcon,
  Heading as HeadingIcon,
  LayoutList,
  X,
} from "lucide-react";

import {
  use,
  useActionState,
  useEffect,
  useState,
  type ChangeEvent,
} from "react";

import Image from "next/image";
import { toast } from "sonner";
import DeleteInfiniteItemModal from "./delete-infinite-item-modal";

/* -------------------------------- */
/* ------ REUSABLE SECTION CARD ---- */
/* -------------------------------- */

const SectionCard = ({
  icon: Icon,
  title,
  children,
}: {
  icon: any;
  title: string;
  children: React.ReactNode;
}) => (
  <div className="p-6 rounded-xl border bg-card shadow-sm space-y-4">
    <div className="flex items-center gap-3">
      <div className="p-3 rounded-lg bg-brand-teal/20 text-brand-teal">
        <Icon size={20} />
      </div>
      <h2 className="text-sm font-semibold">{title}</h2>
    </div>
    {children}
  </div>
);

/* -------------------------------- */
/* ----------- ITEM ROW ------------ */
/* -------------------------------- */

interface InfiniteItem {
  id: number;
  title: string;
  url: string;
  heading: string;
}

const ItemRow = ({ item }: { item: InfiniteItem }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [editedTitle, setEditedTitle] = useState(item.title);

  const [tempUrl, setTempUrl] = useState("");
  const [editPhoto, setEditPhoto] = useState(false);

  const [state, action, pending] = useActionState(
    updateInfiniteItem,
    undefined
  );

  useEffect(() => {
    if (state?.success) {
      setIsEdit(false);
      setTempUrl("");
      setEditPhoto(false);
      toast.success("Item updated successfully.");
    }
  }, [state]);

  useEffect(() => {
    if (!isEdit) setEditedTitle(item.title);
  }, [isEdit, item.title]);

  useEffect(() => {
    setEditPhoto(false);
  }, [tempUrl]);

  return (
    <div className="group border rounded-xl p-4 mb-4 bg-card shadow-sm hover:shadow-md hover:bg-muted/30 transition-all">
      <div className="flex items-center gap-3">
        <div className="flex-1 min-w-0">
          {/* -------- NORMAL VIEW -------- */}
          {!isEdit && (
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-200 flex items-center justify-center">
                <Image
                  src={item.url}
                  alt="infinite logo"
                  width={48}
                  height={48}
                  className="object-cover"
                />
              </div>
              <h3 className="font-semibold text-sm truncate">{item.title}</h3>
            </div>
          )}

          {/* -------- EDIT MODE -------- */}
          {isEdit && (
            <div className="mt-4 flex flex-col gap-4">
              {/* IMAGE EDIT BLOCK */}
              <div className="flex items-start gap-4">
                <div className="relative w-32 h-32 rounded-xl overflow-hidden bg-muted group/image">
                  <Image
                    src={tempUrl || item.url}
                    alt="logo"
                    fill
                    className="object-cover transition-opacity duration-200 group-hover/image:opacity-40"
                  />

                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/image:opacity-100 transition">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setEditPhoto(true)}
                    >
                      Change Photo
                    </Button>
                  </div>
                </div>

                {editPhoto && (
                  <div className="relative">
                    <DropzoneImage setUrl={setTempUrl} url={tempUrl} />

                    <Button
                      onClick={() => {
                        setEditPhoto(false);
                        setTempUrl("");
                      }}
                      className="absolute top-2 right-2"
                      size="icon"
                      variant="secondary"
                    >
                      <X size={16} />
                    </Button>
                  </div>
                )}
              </div>

              {/* FORM */}

              <form action={action} className="space-y-3">
                <input type="hidden" name="id" value={item.id} />

                <input
                  type="hidden"
                  name="deletedUrl"
                  value={tempUrl ? item.url : ""}
                />

                <input type="hidden" name="url" value={tempUrl || item.url} />

                <Input
                  name="title"
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                  placeholder="Enter title"
                />

                <div className="flex justify-end gap-2">
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => {
                      setIsEdit(false);
                      setTempUrl("");
                      setEditPhoto(false);
                    }}
                    disabled={pending}
                  >
                    Cancel
                  </Button>

                  <Button
                    type="submit"
                    disabled={pending}
                    className="bg-brand-teal hover:bg-brand-teal/80 cursor-pointer"
                  >
                    {pending ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      "Save"
                    )}
                  </Button>
                </div>
              </form>
            </div>
          )}
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex shrink-0 gap-2">
          {!isEdit && (
            <Button
              variant="outline"
              size="icon"
              className="rounded-full"
              onClick={() => setIsEdit(true)}
            >
              <Edit size={16} />
            </Button>
          )}

          <DeleteInfiniteItemModal
            id={item.id}
            title={item.title}
            url={item.url}
          />
        </div>
      </div>
    </div>
  );
};

/* -------------------------------- */
/* ----------- MAIN SECTION -------- */
/* -------------------------------- */

interface InfiniteSectionProps {
  items: Promise<InfiniteItem[]>;
}

const InfiniteSection = ({ items: itemsPromise }: InfiniteSectionProps) => {
  const items = use(itemsPromise);

  const [isEdit, setIsEdit] = useState(false);
  const [formData, setFormData] = useState({
    heading: items[0].heading || "",
  });

  const originalHeading = items[0].heading;

  const [headingState, headingAction, headingPending] = useActionState(
    updateInfiniteItemsHeading,
    undefined
  );

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  useEffect(() => {
    if (headingState?.success) {
      setIsEdit(false);
      toast.success("Heading updated successfully.");
    }
  }, [headingState]);

  const isChanged = formData.heading.trim() !== originalHeading.trim();

  return (
    <section className="my-10 w-full max-w-3xl space-y-6">
      {/* Heading Block */}
      <SectionCard icon={HeadingIcon} title="Heading">
        {!isEdit && (
          <div className="flex justify-between items-center">
            <p className="text-muted-foreground">{items[0].heading}</p>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full"
              onClick={() => setIsEdit(true)}
            >
              <Edit size={16} />
            </Button>
          </div>
        )}

        {isEdit && (
          <form action={headingAction} className="flex items-center gap-3">
            <Input
              name="heading"
              value={formData.heading}
              onChange={handleOnChange}
            />

            <Button
              disabled={!isChanged || headingPending}
              type="submit"
              className="bg-brand-teal hover:bg-brand-teal/80 cursor-pointer"
            >
              {headingPending ? (
                <Loader2 className="h-4 w-4 animate-spin " />
              ) : (
                "Save"
              )}
            </Button>

            <Button variant="secondary" onClick={() => setIsEdit(false)}>
              Cancel
            </Button>
          </form>
        )}
      </SectionCard>

      {/* Items Label */}
      <div className="flex items-center gap-2 text-xs uppercase font-semibold tracking-wide text-muted-foreground">
        <LayoutList size={14} />
        Items
      </div>

      {/* Items List */}
      {items.length === 0 ? (
        <div className="border rounded-xl p-8 text-center bg-muted/30 text-sm">
          No items available.
        </div>
      ) : (
        items.map((item) => <ItemRow key={item.id} item={item} />)
      )}
    </section>
  );
};

export default InfiniteSection;
