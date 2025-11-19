const { z } = require("zod");
const {createNewMCPServer, mcpServerConnection} = require("./mcp_instance");

const schoolInfo = {
    schoolName: "Shining Vessels Academy",
    description: "Offers a strong academic environment and a calm, supportive learning atmosphere",
    hours: "Mon–Fri 08:00–17:00",
    aboutSchool: "Shining Vessels Academy is a school located in Ahenema Kokoben (near Kumasi, Ghana). The school provides a robust learning environment – it 'offers the opportunity for students to learn in the most extensive and a very strong academic environment and to create academic excellence in every child'.",
    mission: "The school’s mission emphasizes academic excellence and innovation. SVA’s stated mission is 'to create academic excellence in every child'. Its principal goal is described as 'grooming men and women who are capable of doing new things and not repeating what others have done'.",
    vision: "The school’s vision emphasizes academic excellence and innovation. SVA’s stated mission is 'to create academic excellence in every child'. Its principal goal is described as 'grooming men and women who are capable of doing new things and not repeating what others have done'.",
    curriculum: "The school offers a range of programs tailored for different age groups and skill levels, ensuring every child receives the right level of challenge and support. Financial aid and scholarship opportunities are available for qualifying students. Join our community of young innovators and give your child the gift of future-ready education. We offer Smart Tribe programs like Abacus Training, Coding, Robotics, and more from our partner institutions (Smart Tribe) they have the best coding and robotics programs and they are the best in Ghana.",
    admissions: "At Shining Vessels Academy, we welcome students who are eager to explore the exciting world of technology and cognitive development. Our admission process is designed to understand each child's unique potential and how our programs can help them thrive. We offer rolling admissions throughout the year, with new intakes at the beginning of each academic term. Our dedicated admissions team is here to guide you through every step of the process. We accept students from all backgrounds who show enthusiasm for learning and technology. Our programs are tailored for different age groups and skill levels, ensuring every child receives the right level of challenge and support. Financial aid and scholarship opportunities are available for qualifying students. Join our community of young innovators and give your child the gift of future-ready education.",
    facilities: "Shining Vessels Academy is committed to providing a safe and supportive learning environment for all students. Our facilities include modern classrooms, a library, computer labs, and a range of extracurricular activities. We also offer a range of sports facilities, including a gymnasium, swimming pool, and outdoor play areas. Our facilities are designed to support our mission of academic excellence and innovation.",
    location: "Ahenema Kokoben, Kumasi, Ashanti Region, Ghana",
    contact: "Contact Information: Landline +233 242 56 74 89; mobile 0543019791 and 0206663829.",
    phone: ["+233242567489","0543019791","0206663829"]
  }
  

const shiningVesselsMCP = async (req, res) => {
    const mcpServer = createNewMCPServer();
    
    mcpServer.resource("about-shining-vessels-academy", "school://about/shining-vessels-academy", {
        title: "about-shining-vessels-academy",
        description: "All information about Shining Vessels Academy",
        mimeType: "application/json"
    }, async (uri) => {
        return {
            contents: [{uri: uri.href, text: JSON.stringify(schoolInfo), mimeType: "application/json"}]
        }
    })
    
    mcpServer.tool("contact-shining-vessels-administration", "Use this tool to contact school administration", {
        firstName: z.string(),
        lastName: z.string(),
        email: z.string(),
        number: z.string(),
        message: z.string()
    },
    {
        title: "contact-school-admin",
        readOnlyHint: false,
        idempotentHint: false,
        destructiveHint: false,
        openWorldHint: true
    }, async ({firstName, lastName, email, number, message}) => {
        if(firstName && lastName && email && number && message){
            return {
                content: [{type: "text", text: "Email Sent successfully", mimeType: "application/json"}]
            }
        }
        return {
            content: [{type: "text", text: "Email not sent", mimeType: "application/json"}]
        }
    });
    
   await mcpServerConnection(req, res, mcpServer)
}
module.exports = shiningVesselsMCP;