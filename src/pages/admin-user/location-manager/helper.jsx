function Location(locations) {
  const options = locations?.map((location) => {
    const coOrd = (location?.location_coordinators || []).find((coordinator) => coordinator.isPrimary === true);
    return {
      name: location.name,
      locationCoordinator: coOrd?.user?.first_name ? `${coOrd?.user?.first_name} ${coOrd?.user?.last_name}` : '',
      city: location?.locationAddress?.city,
      address: location?.locationAddress?.address,
      locationAddressAptSuite: location?.locationAddress?.aptSuite,
      shippingAddress: location?.shippingAddress?.address,
      shippingAddressAptSuite: location?.shippingAddress?.aptSuite,
      isActive: location?.isActive,
      examCenter: location?.exam_center?.id,
      isActiveExamCenter: location?.exam_center?.isActive,
      classTiming: location?.classTiming,
      startTime: location?.startTime,
      endTime: location?.endTime,
      region: location?.region?.id,
      coordinator: location?.location_coordinators,
      contactNumber: coOrd?.user?.contact_number,
      activeCourses: location?.location_courses,
      id: location?.id,
      addressId: location?.locationAddress?.id,
      shippingAddressId: location?.shippingAddress?.id,
    };
  });
  return options;
}

function getEmptyLocation() {
  return {
    locationName: '',
    status: '',
    locationAddress: '',
    locationAddressAptSuite: '',
    shippingAddress: '',
    shippingAddressAptSuite: '',
    examCenter: '',
    region: '',
    coOrdinator: [],
    contactNumber: '',
    activeCourses: [],
    changeLog: '',
    day: '',
    startTime: '',
    endTime: '',
  };
}

function GetAllLocations(locations) {
  return Location(locations);
}

function GetOnlyActiveLocations(locations) {
  let options = locations.filter((obj) => obj.isActive);
  options = Location(options);
  return options;
}

function getWeekDays() {
  return [
    { id: 'Sunday', name: 'Sunday' },
    { id: 'Monday', name: 'Monday' },
    { id: 'Tuesday', name: 'Tuesday' },
    { id: 'Wednesday', name: 'Wednesday' },
    { id: 'Thursday', name: 'Thursday' },
    { id: 'Friday', name: 'Friday' },
    { id: 'Saturday', name: 'Saturday' },
  ];
}

export {
  GetOnlyActiveLocations,
  GetAllLocations,
  Location,
  getWeekDays,
  getEmptyLocation,
};
