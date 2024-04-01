import argparse, requests
from pprint import pprint

parser = argparse.ArgumentParser(
                    prog="CMU-Courses Data Fetcher",
                    description="Retrieve data from the CMU Courses API about the courses you're interested in"
                    )
parser.add_argument("-n", "--course-number",
                    type=str, required=True,
                    nargs="+", action="extend",
                    )
def main(args):
    api = "https://course-tools.apis.scottylabs.org/courses?schedules=true"
    requestUri = api
    for course in args.course_number:
        requestUri += f"&courseID={course[:2]}-{course[2:]}"
    # print(requestUri)

    resp = requests.get(requestUri).json()

    for courseData in resp:
        print(f"{courseData['courseID']}: {courseData['prereqs']}")

    return

if __name__ == "__main__":
    args = parser.parse_args()
    main(args)
