import { useActionState, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Dropzone from "@/components/dropzone";
import { submitAppliedJob } from "@/app/lib/actions";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

interface ApplyModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  position: string;
  jobId: number;
}

export function ApplyModal({
  open,
  setOpen,
  position,
  jobId,
}: ApplyModalProps) {
  const [state, action, pending] = useActionState(submitAppliedJob, undefined);
  const [url, setUrl] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    github: "",
    linkedIn: "",
    expectedSalary: "",
    experience: "",
    whyInterested: "",
    keySkills: "",
    coverLetter: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  useEffect(() => {
    if (state?.success) {
      setFormData({
        name: "",
        email: "",
        phone: "",
        location: "",
        github: "",
        linkedIn: "",
        expectedSalary: "",
        experience: "",
        whyInterested: "",
        keySkills: "",
        coverLetter: "",
      });

      setUrl(""); // clear resume
      setOpen(false);
      toast.success("Job applied successfully.");
    }
  }, [state, setOpen]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-4xl">
        <DialogHeader>
          <DialogTitle>Job Application</DialogTitle>
          <DialogDescription className=" text-xs">
            Apply for <span className="font-bold text-black">{position}</span>{" "}
            Position.
          </DialogDescription>
        </DialogHeader>

        <form action={action}>
          <div className="h-[500px] overflow-y-auto flex flex-col gap-4 p-2">
            <div className="grid grid-cols-1 gap-4 w-full">
              <div className="flex flex-col gap-2">
                <Dropzone setUrl={setUrl} url={url} />
                {state?.errors?.resumeUrl && (
                  <p className=" text-red-700 text-xs font-semibold">
                    {state.errors.resumeUrl}
                  </p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
              <input type="hidden" name="position" value={position} />
              <input type="hidden" name="resumeUrl" value={url} />

              <div>
                <Label className=" mb-1" htmlFor="name">
                  Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Jhon Doe"
                  value={formData.name}
                  onChange={handleChange}
                />
                {state?.errors?.name && (
                  <p className=" text-red-700 text-xs font-semibold">
                    {state.errors.name}
                  </p>
                )}
              </div>
              <div>
                <Label className=" mb-1" htmlFor="email">
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="jhondoe@gmail.com"
                  value={formData.email}
                  onChange={handleChange}
                />
                {state?.errors?.email && (
                  <p className=" text-red-700 text-xs font-semibold">
                    {state.errors.email}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
              <div>
                <Label className=" mb-1" htmlFor="phone">
                  Phone no
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  type="number"
                  placeholder="019XXXXXXXX"
                  value={formData.phone}
                  onChange={handleChange}
                  inputMode="numeric" // mobile shows number keypad
                  pattern="[0-9]*" // allows only digits
                  onWheel={(e) => e.currentTarget.blur()} // prevent scroll change
                  className="no-spinner"
                />
                {state?.errors?.phone && (
                  <p className=" text-red-700 text-xs font-semibold">
                    {state.errors.phone}
                  </p>
                )}
              </div>
              <div>
                <Label className=" mb-1" htmlFor="location">
                  Current location
                </Label>
                <Input
                  id="location"
                  name="location"
                  type="text"
                  placeholder="Khilgaon, Dhaka"
                  value={formData.location}
                  onChange={handleChange}
                />
                {state?.errors?.location && (
                  <p className=" text-red-700 text-xs font-semibold">
                    {state.errors.location}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
              <div>
                <Label className=" mb-1" htmlFor="github-1">
                  Github
                </Label>
                <Input
                  id="github-1"
                  name="github"
                  type="text"
                  placeholder="https://www.github.com/jhondoe"
                  value={formData.github}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label className=" mb-1" htmlFor="linkedIn-1">
                  linkedIn
                </Label>
                <Input
                  id="linkedIn-1"
                  name="linkedIn"
                  type="text"
                  placeholder="https://www.linkedIn.com/in/jhondoe"
                  value={formData.linkedIn}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
              <div>
                <Label className=" mb-1" htmlFor="experience">
                  Experience
                </Label>
                <Input
                  id="experience"
                  name="experience"
                  type="text"
                  placeholder="5 years"
                  value={formData.experience}
                  onChange={handleChange}
                />
                {state?.errors?.experience && (
                  <p className=" text-red-700 text-xs font-semibold">
                    {state.errors.experience}
                  </p>
                )}
              </div>
              <div>
                <Label className=" mb-1" htmlFor="expectedSalary">
                  Expected salary
                </Label>
                <Input
                  id="expectedSalary"
                  name="expectedSalary"
                  type="number"
                  onChange={handleChange}
                  inputMode="numeric" // mobile shows number keypad
                  pattern="[0-9]*" // allows only digits
                  placeholder="123456"
                  value={formData.expectedSalary}
                  onWheel={(e) => e.currentTarget.blur()} // prevent scroll change
                  className="no-spinner"
                />
                {state?.errors?.expectedSalary && (
                  <p className=" text-red-700 text-xs font-semibold">
                    {state.errors.expectedSalary}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 w-full">
              <div className="flex flex-col gap-2">
                <Label className=" mb-1" htmlFor="whyInterested">
                  Why are you interested in this position? (Short Answer)
                </Label>
                <Textarea
                  id="whyInterested"
                  name="whyInterested"
                  placeholder="Tell us why you are interested in this job"
                  className="h-24"
                  value={formData.whyInterested}
                  onChange={handleChange}
                />
                {state?.errors?.whyInterested && (
                  <p className=" text-red-700 text-xs font-semibold">
                    {state.errors.whyInterested}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 w-full">
              <div className="flex flex-col gap-2">
                <Label className=" mb-1" htmlFor="keySkills">
                  Key Skills/Experience Relevant to the Role (Optional)
                </Label>
                <Textarea
                  id="keySkills"
                  name="keySkills"
                  placeholder="Tell us about your relevant skills or experience"
                  className="h-24"
                  value={formData.keySkills}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 w-full">
              <div className="flex flex-col gap-2">
                <Label className=" mb-1" htmlFor="coverLetter">
                  Cover Letter (Optional)
                </Label>
                <Textarea
                  id="coverLetter"
                  name="coverLetter"
                  placeholder="Write your cover letter here"
                  className="h-32"
                  value={formData.coverLetter}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <DialogFooter className="  mt-2">
            <DialogClose asChild>
              <Button
                variant="outline"
                className=" bg-brand-teal hover:bg-brand-teal/80 cursor-pointer"
              >
                Cancel
              </Button>
            </DialogClose>
            <Button
              disabled={pending}
              className="bg-brand-teal hover:bg-brand-teal/80 cursor-pointer"
            >
              {pending ? (
                <>
                  <Loader2 className=" animate-spin" />
                  <span>Applying</span>
                </>
              ) : (
                "Apply Now"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
