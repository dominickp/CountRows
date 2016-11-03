function jobArrived( s : Switch, job : Job )
{
	//if the job is a folder it is passed as is and the count is set to -1
	if (job.isFolder() == true) {
		job.sendToSingle(job.getPath());
		job.setPrivateData( s.getPropertyValue( "PrivateDataKey" ), -1);
		return;
	}

	// Construct File object
	var file = new File( job.getPath() );

	/// Open file as read only
	file.open( File.ReadOnly );

	// Create an array of the lines of the file
	var file_as_array = file.readLines();

	// Close the file
	file.close();

	// Count lines
	var lines;
	s.log(-1,"Empty lines: "+s.getPropertyValue("EmptyLines"));
	if (s.getPropertyValue("EmptyLines") == "Yes") {
		lines = file_as_array.length;
	} else {
		lines = 0;
		for (var i=0; i<file_as_array.length; i++) {
			if (file_as_array[i] !== "") {
				lines = lines+1;
			}
		}
	}

	// Log number of lines
	s.log(-1, "Number of lines = "+lines);

	// Write number of lines to private data
	job.setPrivateData( s.getPropertyValue( "PrivateDataKey" ), lines );

	// Send job to next flow element
	job.sendToSingle( job.getPath() );

}
