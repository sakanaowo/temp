## <span style="color:rgb(255, 105, 97)">Basic definition</span>
1. Database:
	- A collection of related data
2. DataL
	1. Known facts that can be recorded and have an implici meaning
3. Mini-world
	1. Some part of the real world about which data is stored in a DB. For ex, student grades and transcripts at the university
4. Database management system - DBMS
	1. A software package/ system to 
5. DB system
	1. The DSMS software together with 

## <span style="color:rgb(255, 105, 97)">Typical DBMS functionality</span>
1. Define a particular DB in terms of its data types, structures and constrains
2. Construct or load the initial DB contents on a secondary storage
3. Manipulating the DB:
	1. Retrieval: Querying, generating reports
	2. Modification: Insertions, deletions and updates to its content
	3. Accessing the DB through Web application
4. Processing and Sharing by a set of concurrent users and application programs - yet, keeping all data valid and consistent
5. Other features:
	1. Protection or security measures to prevent unauthorized access
	2. Active processing to take internal actions on data
	3. Presentation

## <span style="color:rgb(255, 105, 97)">Example:</span>

1. Miniworld for the example: part of an university environment
2. Some miniworld entities:
	1. student
	2. course
	3. section
	4. department
	5. instructor

## <span style="color:rgb(255, 105, 97)">Main Characteristics of the DB approach</span>

1. Self-describing nature of a DB system
	1. A DBMS catalog stores the description of a particular DB
	2. The description is called **meta-data**
	3. Allows the DBMS software to work with different DB application
2. Insulation between programs and data:
	1. Called program-data independence
	2. Allows changing 
3. Data Abstraction: 
	1. A data model is used to hide storage details and present the users with a conceptual view of the database.  
	2. Programs refer to the data model constructs rather than data storage details
4. Support of multiple views of the data: 
	1. Each user may see a different view of the database, which describes only the data of interest to that user.
5. Sharing of data and multi-user transaction processing:
	1. Allowing a set of concurrent users to retrieve from and to update the database.
	2. Concurrency control within the DBMS guarantees that each transaction is correctly executed or aborted
	3. Recovery subsystem ensures each completed transaction has its effect permanently recorded in the database
	4. OLTP (Online Transaction Processing) is a major part of database applications. This allows hundreds of concurrent transactions to execute per second.
6. DB user
	1. Users may be divided into
		1. Those who actually use and control the database content, and those who design, develop and maintain database applications (called "Actors on the Scene"), and
		2. Those who design and develop the DBMS software and related tools, and the computer systems operators (called "Workers Behind the Scene").
7. Advantages of using the DB Approach
	1. Providing backup and recovery services.
	2. Providing multiple interfaces to different classes of users.
	3. Representing complex relationships among data.
	4. Enforcing integrity constraints on the database.
	5. Drawing inferences and actions from the stored data using deductive and active rules
8. Iditional Implications of Using the Database Approach& 
	1. Potential for enforcing standards:
		1. This is very crucial for the success of database applications in large organizations. Standards refer to data item names, display formats, screens, report structures, meta-data (description of data), Web page layouts, etc.
	2. Reduced application development time:
		1. Incremental time to add each new application is reduced.