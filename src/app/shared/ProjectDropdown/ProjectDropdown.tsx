import React, { useEffect, useState } from 'react'
import AsyncSelect from 'react-select/async';
import { KTIcon } from '../../../_metronic/helpers';
import { getAllProjects } from '../../project-management/core/_request';

interface DropdownProps{
  selectedValue:(e:any) => void
}

const ProjectDropdown = ({selectedValue}:DropdownProps) => {
  const [projectsData, setProjectsData] = useState<any[]>([]);

  const filterProjects = (inputValue: string) => {
    return projectsData.filter((i) =>
      i.label.toLowerCase().includes(inputValue.toLowerCase())
    );
  };
  const loadOptions = (
    inputValue: string,
    callback: (options: any[]) => void
  ) => {
    setTimeout(() => {
      callback(filterProjects(inputValue));
    }, 1000);
  };
  useEffect(() => {
    getAllProjects().then((res) => {
      setProjectsData(res.data);
    })
  }, []);
  return (
    <div className="input-group flex-nowrap">
    <span className="input-group-text">
        <KTIcon iconName='abstract-26' iconType="duotone" />
    </span>
    <div className="overflow-hidden flex-grow-1">
    <AsyncSelect onChange={(choice) => selectedValue(choice.value)}  cacheOptions loadOptions={loadOptions} defaultOptions />
       
    </div>
    </div>
  )
}

export default ProjectDropdown