import os
import re
import uvicorn
import openai
from fastapi import FastAPI
from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware

load_dotenv()
app = FastAPI()
origins = [
    "http://localhost:3000",
]
openai.api_key = "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"

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/")
def index(command:str, input_text:str):
    if(command.strip().lower()=='summarize'):
        response = openai.Completion.create(
            engine="text-davinci-001",
            prompt=summarize_prompt(input_text),
            temperature=1,
            max_tokens=1000,
            top_p=0.5,
            frequency_penalty=0,
            presence_penalty=0,
            best_of=3,
            stop=["/n"]
        )

    
    return ({response.choices[0].text})

    


def summarize_prompt(input_text):
    return f"""Summarize this for a second-grade student:
    {input_text}"""

@app.post("/answer")
def question_answer(question:str,input_text:str):
    header = """Answer the question as truthfully as possible using the provided context, and if the answer is not contained within the text below, say "No reference to the legal text"\n\nContext:\n"""
    section = """Rahul Sharma (also known as “the Contractor”) will provide Sun Solutions Pte. Ltd (also known as
“the Client”) with [Education Content Design Service] as to the specifications detailed in the Scope of
Work below.
Contract in effect beginning: 28/Aug/2022
Scope of
Work
● Based on the assignment from the Client, the Contractor shall provide one of the below
services.
■ Create educational content , including syllabus, videos ,articles
or diagrams
● All the contents should be created originally by the Contractor.
● The contents should be delivered in correct format and resolution based on the
Client’s requirement
● The Contractor should review the content created and ensure it’s meeting the
Client’s requirement.

Payment Client will pay Contractor via direct deposit, PayPal, credit card, or other electronic payment
processor as agreed to by both parties.
● The Client has the right to review and approve the deliverables delivered by the Contractor.
● When the work is approved by Client, Client will send a confirmation to Contractor via email as a
record.
● The Client will pay an agreed amount based on the email communication to the Contractor for
each assignment. If the Contractor fails to complete the assignment, the Contractor should return
the original amount to the Client .
Copyright The Contractor warrants that all Services and Deliverables are originally created by the
Contractor, and do not infringe upon any third party’s patents, trademarks, trade secrets, copyrights or
other proprietary rights. Contractor takes full responsibility for any IP infringement for the Deliverables.
Client will own the copyright and all Intellectual Property Rights for all material created under this
agreement.
Termination This agreement may be terminated with 15 days written notice by either party."""
    prompt = header + input_text + "\n\n Q: " + question + "\n A:"
    response = openai.Completion.create(
        prompt = prompt,
        temperature = 0,
        max_tokens = 300,
        top_p = 1,
        frequency_penalty=0,
        presence_penalty=0,
        model = 'davinci'
        )
    print(response)
    return ({response["choices"][0]["text"].split("\n",1)[0]})

@app.post("/analyse")
def analyse_text(docs:str):
    response=openai.Completion.create(
        engine="text-davinci-001",
        prompt=f"Explain the unfair contract terms in the following contract:\n\n{docs}",
        temperature=0.7,
        max_tokens=1000,
        top_p=1,
        frequency_penalty=0,
        presence_penalty=0,
        
        )
    return ({response['choices'][0].text})
    

if __name__=='__main__':
    uvicorn.run(app,host='127.0.0.1',port=8000)
    
