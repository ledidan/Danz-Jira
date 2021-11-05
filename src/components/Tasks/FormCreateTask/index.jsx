import { Editor } from "@tinymce/tinymce-react";
import { Input, Select, Slider } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { createAction } from "../../../store/actions";
import { getPriority } from "../../../store/actions/priority";
import { fetchAllProjects } from "../../../store/actions/project";
import { getStatus } from "../../../store/actions/status";
import { createTaskForm, fetchAllTaskTypes } from "../../../store/actions/task";
import { actionType } from "../../../store/actions/type";
import { getMembersByProjectId } from "../../../store/actions/user";
import { ACCESS_TOKEN } from "../../../utils/constants/config";
import "./index.css";
import { createTaskSchema } from "../../../services/task";
import { useHistory } from "react-router";

const FormCreateTask = (props) => {
  let history = useHistory();
  const dispatch = useDispatch();
  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
      formik.setFieldValue("description", editorRef.current.getContent());
    }
  };

  const [timeTracking, setTimeTracking] = useState({
    totalEstimatedHours: 0,
    timeTrackingSpent: 0,
  });

  let timeTrackingRemaining =
    timeTracking.totalEstimatedHours - timeTracking.timeTrackingSpent;


  const projectList = useSelector((state) => state.project.projectList);
  const taskTypes = useSelector((state) => state.task.taskTypes);
  const priority = useSelector((state) => state.priority.priority);
  const projectMembers = useSelector((state) => state.user.projectMembers);
  const statusTypes = useSelector((state) => state.status.statusTypes);

  const formik = useFormik({
    enableReinitialize: true,

    initialValues: {
      listUserAsign: [],
      taskName: "",
      description: "",
      statusId: statusTypes[0]?.statusId,
      originalEstimate: 0,
      timeTrackingSpent: 0,
      projectId: projectList[0]?.id,
      typeId: taskTypes[0]?.id,
      priorityId: priority[0]?.priorityId,
    },
    validationSchema: createTaskSchema,
    validateOnMount: true,

    onSubmit: (values) => {
      console.log("values", values);

      formik.setTouched({
        taskName: true,
        description: true,
      });

      if (!formik.isValid) return;

      let data = { ...values, timeTrackingRemaining: timeTrackingRemaining };
      dispatch(createTaskForm(data));

      formik.resetForm();
///ko clear form dc

      formik.setTouched({
        taskName: false,
        description: false,
      });

      history.push("/projects");
    },
  });

  useEffect(() => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (token) dispatch(fetchAllProjects());
    dispatch(fetchAllTaskTypes);
    dispatch(getPriority);
    dispatch(getStatus);
    dispatch(getMembersByProjectId(projectList[0]?.id));
    dispatch(createAction(actionType.SET_SUBMIT_FUNCTION, formik.handleSubmit));
  }, [dispatch]);

  
  

  return (
    <form className="container" onSubmit={formik.handleSubmit}>
      <div className="w-full ">
        {/* tên project */}
        <p>Project </p>
        <select
          className="select"
          name="projectId"
          onChange={(e) => {
            let { value } = e.target;
            dispatch(getMembersByProjectId(value));
            formik.setFieldValue("projectId", value);
            formik.setFieldValue("listUserAsign", []);
          }}
        >
          {projectList.map((project, i) => {
            return (
              <option key={i} value={project.id}>
                {project.projectName}
              </option>
            );
          })}
        </select>
        <span className="italic font-medium text-sm mt-2 ">
          * You can only create tasks of your own projects!
        </span>
      </div>

      {/* tên task */}
      <div className="mt-3">
        <p>Task name</p>
        <input
          className="select"
          name="taskName"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.taskName && (
          <p className="text-red-600"> {formik.errors.taskName}</p>
        )}
      </div>

      {/* status */}
      <div className="w-full mt-3">
        <p>Status </p>
        <select
          className="select"
          name="statusId"
          onChange={formik.handleChange}
          style={{ width: "100%" }}
        >
          {statusTypes?.map((item, i) => {
            return (
              <option key={i} value={item.statusId}>
                {item.statusName}
              </option>
            );
          })}
        </select>
      </div>

      <div className="w-full flex justify-between ">
        {/* priority */}
        <div className="w-5/12 mt-3 ">
          <p>Priority </p>
          <select
            className="select"
            name="priorityId"
            onChange={(value) => {
              formik.setFieldValue("priorityId", value);
            }}
          >
            {priority?.map((item, i) => {
              return (
                <option key={i} value={item.priorityId}>
                  {item.priority}
                </option>
              );
            })}
          </select>
        </div>
        <div className="w-5/12 mt-3">
          <p>Task Type</p>
          <select
            className="select"
            name="typeId"
            onChange={formik.handleChange}
          >
            {taskTypes?.map((item, i) => {
              return (
                <option key={i} value={item.id}>
                  {item.taskType}
                </option>
              );
            })}
          </select>
        </div>
      </div>

      {/* members */}
      <div className="w-full mt-3">
        <p>Assigners</p>
        <Select
          name="listUserAsign"
          value={formik.values.listUserAsign}
          mode="multiple"
          size="midle"
          options={
            projectMembers.length > 0 &&
            projectMembers.map((item, i) => {
              return { value: item.userId, label: item.name };
            })
          }
          optionFilterProp="label"
          onChange={(values) => {
            formik.setFieldValue("listUserAsign", values);
          }}
          style={{ width: "100%" }}
        ></Select>
      </div>

      {/* Time Tracking */}
      <div className="w-full mt-3">
        <p>Time Tracking</p>
        <div className="w-full flex justify-between ">
          <div className="w-5/12 mt-3 ">
            <p>Total Estimated Hours </p>
            <input
              name="originalEstimate"
              type="number"
              defaultValue="0"
              className="select"
              min="0"
              onChange={(e) => {
                setTimeTracking({
                  ...timeTracking,
                  totalEstimatedHours: e.target.value,
                });

                formik.setFieldValue("originalEstimate", +e.target.value);
              }}
            />
          </div>
          <div className="w-5/12 mt-3 ">
            <p>Hours spent </p>
            <input
              name="timeTrackingSpent"
              className="select input"
              type="number"
              defaultValue="0"
              min="0"
              max={timeTracking.totalEstimatedHours}
              name="timeTrackingSpent"
              onChange={(e) => {
                setTimeTracking({
                  ...timeTracking,
                  timeTrackingSpent: e.target.value,
                });

                formik.setFieldValue("timeTrackingSpent", +e.target.value);
              }}
            />
          </div>
        </div>
        <div className="w-full">
          {/*  thanh slider */}
          <Slider
            value={timeTracking.timeTrackingSpent}
            max={
              Number(timeTrackingRemaining) +
              Number(timeTracking.timeTrackingSpent)
            }
            // tooltipVisible //cái cục trên thanh slider
            className="mt-5"
          />

          <div className="flex justify-between">
            <div className="text-left  font-bold">
              {timeTracking?.timeTrackingSpent} hour(s) spent
            </div>
            <div className="text-left  font-bold">
              {timeTrackingRemaining} hour(s) remaining
            </div>
          </div>
        </div>
      </div>

      {/* description */}
      <div>
        <p className="mt-3">Description</p>
        <Editor
          onBlur={formik.handleBlur}
          onEditorChange={log}
          name="description"
          onInit={(evt, editor) => (editorRef.current = editor)}
          initialValue=""
          init={{
            height: 500,
            menubar: false,
            plugins: [
              "advlist autolink lists link image charmap print preview anchor",
              "searchreplace visualblocks code fullscreen",
              "insertdatetime media table paste code help wordcount",
            ],
            toolbar:
              "undo redo | formatselect | " +
              "bold italic backcolor | alignleft aligncenter " +
              "alignright alignjustify | bullist numlist outdent indent | " +
              "removeformat | help",
            content_style:
              "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
          }}
        />
        {formik.touched.description && (
          <p className="text-red-600">{formik.errors.description}</p>
        )}
      </div>
    </form>
  );
};

export default FormCreateTask;
