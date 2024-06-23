import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { KTCard } from "../../../../_metronic/helpers";
import allLocales from "@fullcalendar/core/locales-all";
import { getAllProjects } from "../../core/_request";
import { AxiosResponse } from "axios";
import AppInfoModal from "../../components/modals/AppInfoModal/AppInfoModal";

const Events = () => {
  const [project, setProject] = useState<any[]>([]);
  const [key, setKey] = useState(0);
  const [projectId, setProjectId] = useState<number>(0);
  const [openModal, setOpenModal] = useState<boolean>(false);

  const handleGetAllProjects = () => {
    getAllProjects().then((res: AxiosResponse<any[]>) => {
      const finalData: any[] = [];
      res.data.forEach((project) => {
        finalData.push({
          id: project.id,
          title: project.description,
          isCompleted: project.isCompleted,
          start: new Date(project.startingDate),
          end: new Date(project.endDate),
        });
      });
      setProject(finalData);
      setKey((prevKey) => prevKey + 1);
    });
  };

  const handleEventClick = (info: any) => {
    setProjectId(Number(info.event._def.publicId));
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  useEffect(() => {
    handleGetAllProjects();
  }, []);

  function renderEventContent(eventInfo: any) {
    const status=eventInfo.event._def.extendedProps.isCompleted
    return (
      <span className={`cursor-pointer ${status?'bg-success text-inverse-success':'bg-primary text-inverse-primary'} w-100 d-block border-success`}>
        {eventInfo.event.title}
      </span>
    );
  }

  return (
    <>
      <KTCard className="p-5">
        <FullCalendar
          key={key} // Anahtar değeri
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            end: "dayGridMonth,dayGridWeek,dayGridDay",
          }}
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          weekends={true}
          eventContent={renderEventContent}
          locale="tr"
          locales={allLocales}
          events={project}
          eventClick={handleEventClick}
        />
      </KTCard>
      <AppInfoModal
        show={openModal}
        projectId={projectId}
        handleClose={handleCloseModal}
      />
    </>
  );
};

export default Events;
