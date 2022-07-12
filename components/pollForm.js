import { useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";
import { Formik, Form } from "formik";
import { FiPlus, FiX } from "react-icons/fi";

const PollForm = ({ redirectPath = "", onSubmit = () => null }) => {
  const router = useRouter();
  const [cBy, setCBy] = useState("anonymous");
  const [visibility, setVisibility] = useState("private");
  const [disabled, setDisabled] = useState(false);
  const [options, setOptions] = useState([]);
  const [question, setQuestion] = useState("");
  const [newOption, setNewOption] = useState("");

  const handleSubmit = async (values) => {
    let toastId;
    try {
      setDisabled(true);

      if (typeof onSubmit === "function") {
        if (options.length >= 2 && options.length <= 6) {
          if (question.length > 0) {
            toastId = toast.loading("Creating poll...");
            await onSubmit({
              title: question,
              options: options,
              visibility: visibility,
              createdBy: cBy,
            });
            toast.success("Poll created successfully!", {
              autoClose: 3000,
              closeButton: false,
              id: toastId,
            });
            router.push(redirectPath);
          } else {
            toast.error("Please add a question!");
            setDisabled(false);
          }
        } else {
          if (options.length < 2) {
            //   console.log("i love you");
            toast.error("Please add at least two options!");
            setDisabled(false);
          } else if (options.length > 6) {
            toast.error("You can add at most six options!");
            setDisabled(false);
          }
        }

        // await onSubmit({ ...values, createdBy: cBy, visibility: visibility });
      }
    } catch (error) {
      toast.error(error.message, {
        autoClose: 3000,
        closeButton: false,
        id: toastId,
      });
      setDisabled(false);
    }
  };

  return (
    <Formik
      initialValues={{
        question: "",
        option: "",
      }}
      validator={() => {}}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, isValid }) => (
        <Form className="flex flex-col gap-3 w-full h-full font-sans">
          <div className="form-group flex flex-col w-full">
            <label
              htmlFor="question"
              className="text-gray-600 dark:text-gray-200"
            >
              Question
            </label>
            <input
              type="text"
              name="question"
              id="question"
              className="form-control text-gray-700 placeholder:text-gray-600 px-4 py-2 focus:outline-none dark:bg-gray-300 disabled:bg-gray-500 border-gray-400 border-2 rounded"
              placeholder="Enter question"
              disabled={disabled}
              onChange={(e) => setQuestion(e.target.value)}
            />
          </div>
          <div className="form-group flex flex-col w-full">
            <label
              htmlFor="option"
              className="text-gray-600 dark:text-gray-200"
            >
              Add New Option{" "}
              <span className="text-xs text-gray-500 dark:text-gray-300">
                min 2 and max 6
              </span>
            </label>
            <div className="flex gap-3">
              <input
                type="text"
                name="option"
                id="option"
                className="form-control px-4 py-2 text-gray-800 placeholder:text-gray-700 focus:outline-none border-gray-400 dark:bg-gray-300 disabled:bg-gray-500 border-2 rounded w-full"
                placeholder="Enter option 1"
                disabled={disabled}
                onChange={(e) => setNewOption(e.target.value)}
                value={newOption}
              />
              <button
                type="button"
                className="px-4 py-2 bg-green-400 text-gray-800 duration-300 hover:ring-2 rounded ring-green-500"
                disabled={!isValid || isSubmitting}
                onClick={() => {
                  if (newOption) {
                    if (options.length < 6) {
                      setOptions([...options, newOption]);
                      setNewOption("");
                    } else {
                      toast.error("You can add at most six options!");
                    }
                  } else {
                    toast.error("Please enter an option!");
                  }
                }}
              >
                <FiPlus />
              </button>
            </div>
          </div>
          {options.length > 0 && (
            <div className="cursor-context-menu option-container flex flex-col gap-3 w-full overflow-y-scroll max-h-40 h-auto options-container py-1">
              {options.map((option, index) => (
                <div key={index} className="flex gap-3 ">
                  <input
                    type="text"
                    name="option"
                    id="option"
                    className="form-control text-gray-800 placeholder:text-gray-700 px-4 py-2 focus:outline-none dark:bg-gray-300 disabled:bg-gray-500 border-gray-400 border-2 rounded w-full"
                    placeholder={`Enter option ${index + 1}`}
                    disabled={disabled}
                    value={option}
                    onChange={(e) => {
                      const newOptions = [...options];
                      newOptions[index] = e.target.value;
                      setOptions(newOptions);
                    }}
                  />
                  <button
                    type="button"
                    className="px-4 py-2 duration-300 bg-red-400 text-gray-800 hover:ring-2 rounded ring-red-500"
                    disabled={!isValid || isSubmitting}
                    onClick={() => {
                      const newOptions = [...options];
                      newOptions.splice(index, 1);
                      setOptions(newOptions);
                    }}
                  >
                    <FiX />
                  </button>
                </div>
              ))}
            </div>
          )}
          <div className="form-group flex flex-col w-full">
            <label
              htmlFor="option1"
              className="text-gray-600 dark:text-gray-200"
            >
              Created By
            </label>
            <input
              type="text"
              name="createdBy"
              id="createdBy"
              className="form-control px-4 py-2 text-gray-800 placeholder:text-gray-700 dark:bg-gray-300 disabled:bg-gray-500 focus:outline-none border-gray-400 border-2 rounded w-full"
              placeholder="Enter your name"
              disabled={disabled}
              value={cBy}
              onChange={(e) => setCBy(e.target.value)}
            />
          </div>
          <div className="form-group flex flex-col w-full">
            <label
              htmlFor="visibility"
              className="text-gray-600 dark:text-gray-200"
            >
              Visibility{" "}
              <span className="text-xs text-gray-500 dark:text-gray-300">
                public polls will be listed on site
              </span>
            </label>
            <select
              name="visibility"
              id="visibility"
              className="form-control text-gray-800 placeholder:text-gray-600 px-4 py-2 focus:outline-none dark:bg-gray-300 disabled:bg-gray-500 border-gray-400 border-2 rounded w-full"
              disabled={disabled}
              value={visibility}
              onChange={(e) => setVisibility(e.target.value)}
            >
              <option value="private">Private</option>
              <option value="public">Public</option>
            </select>
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-green-400 duration-300 text-black hover:ring-2 rounded ring-green-500"
            disabled={!isValid || isSubmitting}
          >
            Create Poll
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default PollForm;
