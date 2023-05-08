import re
import openai

def analyse_text(docs:str):
    openai.api_key ="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"
    my_dict={}
    
    response=openai.Completion.create(
        engine="text-davinci-001",
        prompt=f"Explain the unfair contract terms in the following contract:\n\n{docs}",
        temperature=0.7,
        max_tokens=1000,
        top_p=1,
        frequency_penalty=0,
        presence_penalty=0,
        
        )
    print(response['choices'][0].text)
    


if __name__=='__main__':
    analyse_text("""1. To pay and indemnify the TENANTS against all rates assessments and outgoings in respect of the Apartment (except water rate and charges for the supply of gas or electric light and power or the use of any telephone DG maintenance.)
2. That the TENANTS, paying the rent and performing the agreements on the part of the TENANTS, may quietly possess and enjoy the Apartment during the tenancy without any lawful interruption from the LANDLORD or any person claiming under or in trust for the LANDLORD.
3. To collect the mutually agreed rent of Rs. 45,000/- (Rupees Forty Five Thousand only) per month on or before 5th day of the each english calendar month.
4. The tenants shall not be held responsible for any damage caused by earthquake, tempest, common fire, military, mob violence, act of god or any other accident due to irresistible forces beyond the control of the tenant.
5. Tenants will charge extra in case of damage.
""")