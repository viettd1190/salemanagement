using System;

namespace SaleManagement.WebApp.Models.Response
{
    public class EmpHistoryTrackingResponse
    {
        public long MyId { get; set; }

        public int EmpId { get; set; }

        public string CardName { get; set; }

        public string CardCode { get; set; }

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

        public string TakePic1 { get; set; }

        public string TakePic2 { get; set; }

        public string TakePic3 { get; set; }

        public string TakePic4 { get; set; }
    }
}
