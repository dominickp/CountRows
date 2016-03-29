function jobArrived( s : Switch, job : Job )
{
	
	// Construct File object
	var file = new File( job.getPath() );
	
	/// Open file as read only
	file.open( File.ReadOnly );
	
	// Create an array of the lines of the file
	var file_as_array = file.readLines();
	
	// Close the file
	file.close();
	
	// Count lines
	var lines = file_as_array.length;

	// Log number of lines
	s.log(1, "Lines = "+lines);
	
	// Write number of lines to private data
	job.setPrivateData( s.getPropertyValue( "PrivateDataKey" ), lines );
	
	// Send job to next flow element
	job.sendToSingle( job.getPath() );
	
}