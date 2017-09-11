using System;

namespace SaleManagement.WebApp.Models.Response
{
    public class EmpCustVisitedResponse
    {
        public int EmpId { get; set; }

        public long MyId { get; set; }

        public string CardCode { get; set; }

        public string CardName { get; set; }

        public string Address { get; set; }

        public string LatitudeValue { get; set; }

        public string LongitudeValue { get; set; }

        public string LatLongString { get; set; }

        public short VisitOrder { get; set; }

        public string CustPic { get; set; }

        public int NoCustOrderPlan { get; set; }

        public int NoCustOrderActual { get; set; }

        public int NoCustDelPlan { get; set; }

        public int NoCustDelActual { get; set; }

        public DateTime VisitStartDate { get; set; }

        public DateTime VisitEndDate { get; set; }

        public string VisitTotal { get; set; }

        public short VisitStatus { get; set; }

        public string EmpFullName { get; set; }

        public string PicLink { get; set; }

        public short CheckInPlan { get; set; }

        public short CheckInFinish { get; set; }

        public short NoOrder { get; set; }
    }
}
